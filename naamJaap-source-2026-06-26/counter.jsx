/* counter.jsx — App, panels, controls, tweaks, mount */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "navy",
  "beadStyle": "linked",
  "beadCount": 108,
  "language": "en",
  "mantraId": "radhe",
  "deity": "Radhe",
  "music": false,
  "musicVolume": 0.4,
  "chime": true,
  "chimeVolume": 0.5,
  "haptics": true,
  "animIntensity": "standard",
  "customMantra": ""
}/*EDITMODE-END*/;

function NaamJaapApp(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[t.palette] || PALETTES.navy;
  const L = STR[t.language] || STR.en;
  const beadSize = t.beadCount;

  // persistent state
  const [count, setCount] = useState(()=> LS.get("njc-current-count", 0));
  const [running, setRunning] = useState(false);
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionElapsed, setSessionElapsed] = useState(()=> LS.get("njc-current-elapsed", 0));
  const [sessions, setSessions] = useState(()=> LS.get("njc-sessions", []));
  const [totals, setTotals] = useState(()=> LS.get("njc-totals", { totalMalas:0, totalChants:0, totalSeconds:0 }));
  const [dayLog, setDayLog] = useState(()=> LS.get("njc-day-log", {}));

  // UI state
  const [showExport, setShowExport] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [swell, setSwell] = useState(false);
  const [rotorFlip, setRotorFlip] = useState(false);
  const [bloom, setBloom] = useState(false);
  const [breathe, setBreathe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completedFlash, setCompletedFlash] = useState(false);
  const [ripples, setRipples] = useState([]);

  const undoRef = useRef([]);
  const ringHostRef = useRef(null);

  const { chime, ensure: ensureAudio } = useAudio(t.chime, t.chimeVolume, t.music);

  // ─── Migration on first load ───
  useEffect(()=>{ migrateLegacy(); }, []);

  // ─── persistence ───
  useEffect(()=>{ LS.set("njc-current-count", count); }, [count]);
  useEffect(()=>{ LS.set("njc-current-elapsed", sessionElapsed); }, [sessionElapsed]);
  useEffect(()=>{ LS.set("njc-sessions", sessions); }, [sessions]);
  useEffect(()=>{ LS.set("njc-totals", totals); }, [totals]);
  useEffect(()=>{ LS.set("njc-day-log", dayLog); }, [dayLog]);

  // ─── timer ───
  useEffect(()=>{
    if (!running) return;
    const id = setInterval(()=>{
      setSessionElapsed(s => s + 1);
    }, 1000);
    return ()=> clearInterval(id);
  }, [running]);

  // breathing pulse — subtle, always on
  useEffect(()=>{
    const id = setInterval(()=> setBreathe(b => !b), 3000);
    return ()=> clearInterval(id);
  }, []);

  // ─── deity text watermark sync ───
  useEffect(()=>{
    const el = document.getElementById("deity-mark");
    if (el) el.textContent = DEITY_TEXT[t.deity] || "";
  }, [t.deity]);

  // ─── palette → CSS vars ───
  useEffect(()=>{
    const r = document.documentElement.style;
    r.setProperty("--bg-0", palette.bg0);
    r.setProperty("--bg-1", palette.bg1);
    r.setProperty("--bg-2", palette.bg2);
    r.setProperty("--glow", palette.glow);
    r.setProperty("--glow-soft", palette.glowSoft);
    r.setProperty("--teal", palette.teal);
  }, [palette]);

  // ─── current mantra label ───
  const mantraObj = useMemo(()=>{
    if (t.mantraId === "custom") return { id:"custom", en: t.customMantra || "Custom mantra", hi: t.customMantra || "स्वयं का मंत्र", deity:"None" };
    return MANTRAS.find(m=>m.id===t.mantraId) || MANTRAS[0];
  }, [t.mantraId, t.customMantra]);
  const mantraLabel = t.language === "hi" ? mantraObj.hi : mantraObj.en;
  const mantraSecondary = t.language === "hi" ? mantraObj.en : mantraObj.hi;

  // ─── tap to count ───
  const tap = useCallback((e)=>{
    ensureAudio();
    // start the session timer on first tap
    if (!running){
      setRunning(true);
      if (!sessionStart) setSessionStart(new Date().toISOString());
    }
    // ripple (visual only)
    if (e && ringHostRef.current && t.animIntensity !== "subtle"){
      const rect = ringHostRef.current.getBoundingClientRect();
      const cx = rect.width/2, cy = rect.height/2;
      const id = Math.random();
      setRipples(rs => [...rs, { id, x: cx, y: cy, size: rect.width*0.6 }]);
      setTimeout(()=> setRipples(rs => rs.filter(r=>r.id!==id)), 850);
    }

    setCount(prev => {
      const next = prev + 1;
      undoRef.current.push({ count: prev });

      // swell number
      setSwell(true); setTimeout(()=> setSwell(false), 200);

      // haptic
      if (t.haptics && "vibrate" in navigator){
        try{ navigator.vibrate(next % beadSize === 0 ? [12, 40, 30] : 8); }catch{}
      }

      // chime
      const isMilestone = next % beadSize === 0;
      chime(isMilestone);

      if (isMilestone){
        // complete this mala
        completeMala(next);
        return 0; // reset for next round
      }
      return next;
    });
  }, [running, sessionStart, t.haptics, t.animIntensity, beadSize, chime, ensureAudio]);

  // ─── complete mala ───
  const completeMala = (countAtEnd)=>{
    setRotorFlip(true);
    setBloom(true);
    setCompletedFlash(true);
    setTimeout(()=> setRotorFlip(false), 1200);
    setTimeout(()=> setBloom(false), 1400);
    setTimeout(()=> setCompletedFlash(false), 1800);

    const now = new Date().toISOString();
    const dur = sessionElapsed;
    const session = {
      id: uid(),
      start: sessionStart || now,
      end: now,
      count: beadSize,
      size: beadSize,
      durationSec: dur,
      mantra: mantraLabel,
      deity: t.deity,
      done: true,
      createdAt: now,
    };
    // save (non-blocking — setState handles persistence in effect)
    setSessions(prev => [session, ...prev].slice(0, 200));
    setTotals(prev => ({
      totalMalas: prev.totalMalas + 1,
      totalChants: prev.totalChants + beadSize,
      totalSeconds: prev.totalSeconds + dur,
    }));
    setDayLog(prev => {
      const k = todayKey();
      const day = prev[k] || { malas:0, chants:0, seconds:0 };
      return { ...prev, [k]: {
        malas: day.malas + 1,
        chants: day.chants + beadSize,
        seconds: day.seconds + dur,
      }};
    });
    // continue immediately into next mala
    setSessionStart(now);
    setSessionElapsed(0);
    undoRef.current = [];
  };

  // ─── controls ───
  const toggleRun = ()=>{
    ensureAudio();
    if (!running && !sessionStart) setSessionStart(new Date().toISOString());
    setRunning(r => !r);
  };
  const undo = ()=>{
    if (!undoRef.current.length) return;
    const last = undoRef.current.pop();
    setCount(last.count);
    setSwell(true); setTimeout(()=> setSwell(false), 200);
  };
  const askReset = ()=> setShowResetConfirm(true);
  const doReset = ()=>{
    setCount(0);
    setSessionElapsed(0);
    setSessionStart(null);
    setRunning(false);
    undoRef.current = [];
    setShowResetConfirm(false);
  };

  // ─── keyboard ───
  useEffect(()=>{
    const onKey = (e)=>{
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.code === "Space" || e.code === "Enter"){
        e.preventDefault(); tap();
      } else if (e.code === "Backspace" || e.key === "u" || e.key === "U"){
        e.preventDefault(); undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  }, [tap]);

  // ─── export ───
  const exportCSV = ()=>{
    const head = ["id","start","end","count","size","durationSec","mantra","deity","createdAt"];
    const rows = sessions.map(s => head.map(k => JSON.stringify(s[k] ?? "")).join(","));
    const csv = [head.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type:"text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `naam-jaap-${todayKey()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const copyJSON = ()=>{
    const data = JSON.stringify({ totals, sessions }, null, 2);
    navigator.clipboard?.writeText(data).then(()=>{
      setCopied(true); setTimeout(()=>setCopied(false), 1500);
    }).catch(()=>{});
  };

  // ─── derived ───
  const remaining = beadSize - count;
  const todayStats = dayLog[todayKey()] || { malas:0, chants:0, seconds:0 };

  // ─── topbar chips (portal into header) ───
  useEffect(()=>{
    // re-render handled by React; topbar children are rendered below via portal effect
  }, []);

  return (
    <>
      {/* topbar chips */}
      <TopbarChips
        L={L}
        language={t.language}
        onLang={()=> setTweak("language", t.language === "en" ? "hi" : "en")}
        music={t.music}
        onMusic={()=> setTweak("music", !t.music)}
        onExport={()=> setShowExport(true)}
      />

      {/* counter grid */}
      <div className="counter-wrap">

        {/* LEFT column — Stats */}
        <aside className="side-l">
          <div className="panel">
            <div className="panel-title">
              <span>{L.statsToday}</span>
              <small>{todayKey()}</small>
            </div>
            <div className="stat-row"><span className="k">{L.todayMalas}</span><span className="v">{todayStats.malas}</span></div>
            <div className="stat-row"><span className="k">{L.todayChants}</span><span className="v">{todayStats.chants}</span></div>
            <div className="stat-row"><span className="k">{L.todayTime}</span><span className="v">{fmtTimeShort(todayStats.seconds)}</span></div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <span>{L.statsLifetime}</span>
            </div>
            <div className="stat-row"><span className="k">{L.lifeMalas}</span><span className="v">{totals.totalMalas}</span></div>
            <div className="stat-row"><span className="k">{L.lifeChants}</span><span className="v">{totals.totalChants.toLocaleString()}</span></div>
            <div className="stat-row"><span className="k">{L.lifeTime}</span><span className="v">{fmtTimeShort(totals.totalSeconds)}</span></div>
          </div>
        </aside>

        {/* CENTER — ring */}
        <div className="ring-col">
          <div className="ring-host" ref={ringHostRef}>
            <MalaRing
              size={beadSize}
              count={count}
              palette={palette}
              beadStyle={t.beadStyle}
              breathe={breathe}
              rotorFlip={rotorFlip}
              animIntensity={t.animIntensity}
            />

            {/* center stack */}
            <div className="center-stack">
              <div className="mantra-eyebrow">
                {mantraLabel}
                {mantraSecondary && mantraSecondary !== mantraLabel && (
                  <span className="deva">{mantraSecondary}</span>
                )}
              </div>
              <div className={"count-num " + (swell ? "swell" : "")}>
                {String(count).padStart(beadSize >= 100 ? 3 : 2, "0")}
              </div>
              <div className="count-of"><b>{L.of}</b> &nbsp;{beadSize}&nbsp; <b>{L.mala}</b></div>
              <div className="remaining">
                {completedFlash
                  ? <span style={{color:"var(--gold)"}}>✦ {L.completed} ✦</span>
                  : <>{remaining} {L.remaining}</>
                }
              </div>
            </div>

            {/* completion bloom */}
            <div className={"bloom " + (bloom ? "show" : "")} aria-hidden="true" />

            {/* ripples */}
            {ripples.map(r=>(
              <span key={r.id} className="ripple" style={{
                left: `calc(50% - ${r.size/2}px)`,
                top:  `calc(50% - ${r.size/2}px)`,
                width: r.size, height: r.size,
              }}/>
            ))}

            {/* tap surface (full ring) */}
            <button className="tap-surface" onClick={tap} aria-label={L.tapToCount} />
          </div>

          {/* session line under ring */}
          <div className="session-line">
            <span className={"live " + (running ? "" : "paused")} />
            <span>{running ? L.live : L.paused}</span>
            <span className="dot" />
            <span style={{fontFamily:"var(--mono)"}}>{fmtTime(sessionElapsed)}</span>
            <span className="dot" />
            <span style={{color:"var(--ink-40)"}}>{L.session}</span>
          </div>

          {/* controls */}
          <div className="controls">
            <button className="btn btn-ghost btn-danger" onClick={askReset} aria-label={L.reset}>
              <IconReset/> {L.reset}
            </button>
            <button className="btn btn-ghost" onClick={undo} aria-label={L.undo} disabled={!undoRef.current.length}>
              <IconUndo/> {L.undo}
            </button>
            <button className="btn btn-primary" onClick={toggleRun} aria-label={running ? L.pause : (sessionElapsed > 0 ? L.resume : L.start)}>
              {running ? <><IconPause/> {L.pause}</> : <><IconPlay/> {sessionElapsed>0 ? L.resume : L.start}</>}
            </button>
          </div>

          <div className="hint" aria-hidden="true">
            <span>{L.tapToCount}</span>
            <span>{L.keyboardHint} <span className="kbd">Space</span></span>
          </div>
        </div>

        {/* RIGHT column — Mantra + Recent */}
        <aside className="side-r">
          <div className="panel">
            <div className="panel-title">
              <span>{L.mantra}</span>
            </div>
            <div className="mantra-group">
              {MANTRAS.map(m => (
                <button
                  key={m.id}
                  className={"mantra-tag " + (t.mantraId === m.id ? "on" : "")}
                  onClick={()=> { setTweak({ mantraId: m.id, deity: m.deity }); }}
                >
                  {t.language === "hi" ? m.hi : m.en}
                  <span className="deva">{t.language === "hi" ? m.en : m.hi}</span>
                </button>
              ))}
              <button
                className={"mantra-tag " + (t.mantraId === "custom" ? "on" : "")}
                onClick={()=> setTweak("mantraId", "custom")}
              >{L.custom}</button>
            </div>
            {t.mantraId === "custom" && (
              <input
                type="text"
                value={t.customMantra}
                onChange={e => setTweak("customMantra", e.target.value)}
                placeholder="Type your mantra…"
                style={{
                  width:"100%",marginTop:10,background:"rgba(255,255,255,.04)",
                  border:"1px solid var(--ink-20)",borderRadius:8,padding:"9px 12px",
                  color:"var(--ink-100)",fontSize:13,fontFamily:"var(--serif)"
                }}
              />
            )}

            <div style={{marginTop:14,paddingTop:14,borderTop:"1px dashed var(--ink-10)"}}>
              <div style={{fontSize:11,letterSpacing:".14em",textTransform:"uppercase",color:"var(--ink-60)",marginBottom:8}}>
                {L.deity}
              </div>
              <div className="deity-row">
                {["None","Ram","Radhe","Shiv","Krishna","Waheguru","Gayatri"].map(d=>(
                  <button key={d}
                    className={"deity-tag " + (t.deity === d ? "on" : "")}
                    onClick={()=> setTweak("deity", d)}
                  >{DEITY_TEXT[d] || d}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <span>{L.recent}</span>
              <small>{sessions.length}</small>
            </div>
            {sessions.length === 0 ? (
              <div className="recent-empty" style={{whiteSpace:"pre-line"}}>{L.noRecent}</div>
            ) : (
              sessions.slice(0, 6).map(s => (
                <div key={s.id} className="recent-item">
                  <span className="recent-mantra" title={s.mantra}>{s.mantra}</span>
                  <span className="recent-time">{fmtTime(s.durationSec)}</span>
                  <span className="recent-count">{s.count}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Mood" />
        <TweakColor label="Palette"
          value={[palette.glow, palette.bg0, palette.bg2]}
          options={Object.keys(PALETTES).map(k => [PALETTES[k].glow, PALETTES[k].bg0, PALETTES[k].bg2])}
          onChange={(v) => {
            const key = Object.keys(PALETTES).find(k =>
              PALETTES[k].glow === v[0] && PALETTES[k].bg0 === v[1]);
            if (key) setTweak("palette", key);
          }}
        />
        <TweakSelect label="Bead style"
          value={t.beadStyle}
          options={[
            {value:"linked", label:"Outlined (minimal)"},
            {value:"dots",   label:"Solid dots"},
            {value:"halo",   label:"Glowing halo"},
            {value:"gold",   label:"Gold counted"},
          ]}
          onChange={(v)=> setTweak("beadStyle", v)}
        />
        <TweakRadio label="Mala size" value={t.beadCount}
          options={[
            {value:108, label:"108"},
            {value:54,  label:"54"},
            {value:27,  label:"27"},
          ]}
          onChange={(v)=> { setTweak("beadCount", v); setCount(0); }}
        />
        <TweakRadio label="Animation" value={t.animIntensity}
          options={[
            {value:"subtle", label:"Subtle"},
            {value:"standard", label:"Standard"},
            {value:"lively", label:"Lively"},
          ]}
          onChange={(v)=> setTweak("animIntensity", v)}
        />

        <TweakSection label="Sound" />
        <TweakToggle label="Tap chime" value={t.chime} onChange={v=> setTweak("chime", v)} />
        <TweakSlider label="Chime volume" value={t.chimeVolume} min={0} max={1} step={0.05}
          onChange={v=> setTweak("chimeVolume", v)} />
        <TweakToggle label="Ambient drone" value={t.music} onChange={v=> setTweak("music", v)} />
        <TweakSlider label="Drone volume" value={t.musicVolume} min={0} max={1} step={0.05}
          onChange={v=> setTweak("musicVolume", v)} />

        <TweakSection label="Feel" />
        <TweakToggle label="Haptics (mobile)" value={t.haptics} onChange={v=> setTweak("haptics", v)} />
        <TweakRadio label="Language" value={t.language}
          options={[{value:"en", label:"English"},{value:"hi", label:"हिन्दी"}]}
          onChange={v=> setTweak("language", v)}
        />

        <TweakSection label="Data" />
        <TweakButton label="Export history" onClick={()=> setShowExport(true)} />
        <TweakButton label="Reset all data" onClick={()=> {
          if (confirm("Clear ALL local data — sessions, totals, count? This cannot be undone.")){
            ["njc-current-count","njc-current-elapsed","njc-sessions","njc-totals","njc-day-log"].forEach(LS.del);
            setCount(0); setSessionElapsed(0); setSessions([]);
            setTotals({totalMalas:0,totalChants:0,totalSeconds:0}); setDayLog({});
          }
        }} />
      </TweaksPanel>

      {/* Reset confirmation */}
      {showResetConfirm && (
        <Modal onClose={()=> setShowResetConfirm(false)}>
          <div style={{fontFamily:"var(--serif)",fontSize:22,marginBottom:12,color:"var(--ink-100)"}}>
            {L.confirmReset}
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}>
            <button className="btn btn-ghost" onClick={()=> setShowResetConfirm(false)}>{L.cancel}</button>
            <button className="btn" style={{borderColor:"rgba(232,135,135,.45)",color:"#ffb3b3"}} onClick={doReset}>{L.yesReset}</button>
          </div>
        </Modal>
      )}

      {/* Export modal */}
      {showExport && (
        <Modal onClose={()=> setShowExport(false)}>
          <div style={{fontFamily:"var(--serif)",fontSize:26,color:"var(--ink-100)",marginBottom:6}}>
            {L.exportTitle}
          </div>
          <div style={{fontSize:13.5,color:"var(--ink-60)",lineHeight:1.6,marginBottom:18}}>
            {L.exportDesc}
          </div>
          <div style={{
            background:"rgba(255,255,255,.03)",border:"1px solid var(--line)",borderRadius:10,
            padding:14,fontFamily:"var(--mono)",fontSize:11.5,color:"var(--ink-80)",
            marginBottom:18,lineHeight:1.6,
          }}>
            <div><span style={{color:"var(--ink-40)"}}>sessions</span> &nbsp;<b>{sessions.length}</b></div>
            <div><span style={{color:"var(--ink-40)"}}>total malas</span> &nbsp;<b>{totals.totalMalas}</b></div>
            <div><span style={{color:"var(--ink-40)"}}>total chants</span> &nbsp;<b>{totals.totalChants.toLocaleString()}</b></div>
            <div><span style={{color:"var(--ink-40)"}}>total time</span> &nbsp;<b>{fmtTime(totals.totalSeconds)}</b></div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button className="btn btn-primary" onClick={exportCSV}><IconDownload/> {L.downloadCsv}</button>
            <button className="btn" onClick={copyJSON}>
              <IconCopy/> {copied ? L.copied : L.copyJson}
            </button>
            <div style={{flex:1}}/>
            <button className="btn btn-ghost" onClick={()=> setShowExport(false)}>{L.close}</button>
          </div>
        </Modal>
      )}
    </>
  );
}

function TopbarChips({ L, language, onLang, music, onMusic, onExport }){
  const root = useRef(null);
  useEffect(()=>{
    root.current = document.getElementById("topbar-right");
  }, []);
  if (!root.current) return null;
  return ReactDOM.createPortal(
    <>
      <button className={"chip " + (music ? "chip-on" : "")} onClick={onMusic}
        aria-label={music ? L.musicOn : L.musicOff} title={music ? L.musicOn : L.musicOff}>
        {music ? <IconSpeakerOn/> : <IconSpeakerOff/>}
        <span style={{display:"none"}}>{music ? L.musicOn : L.musicOff}</span>
      </button>
      <button className="chip" onClick={onLang} aria-label="Toggle language">
        <IconGlobe/> {language === "en" ? "EN" : "हि"}
      </button>
      <button className="chip" onClick={onExport} aria-label={L.export}>
        <IconDownload/> {L.export}
      </button>
    </>,
    root.current
  );
}

function Modal({ children, onClose }){
  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:200,
      background:"rgba(4,6,16,.7)",backdropFilter:"blur(8px)",
      display:"grid",placeItems:"center",padding:20,
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"100%",maxWidth:440,background:"linear-gradient(180deg, #14193a 0%, #0c1024 100%)",
        border:"1px solid var(--ink-20)",borderRadius:18,padding:24,
        boxShadow:"0 30px 100px rgba(0,0,0,.6)",
      }}>{children}</div>
    </div>
  );
}

/* ─────── icons ─────── */
const I = (props) => ({ width:15, height:15, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.7, strokeLinecap:"round", strokeLinejoin:"round", ...props });
const IconPlay   = () => <svg {...I()}><path d="M6 4l14 8L6 20z" fill="currentColor"/></svg>;
const IconPause  = () => <svg {...I()}><path d="M7 4v16M17 4v16"/></svg>;
const IconReset  = () => <svg {...I()}><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>;
const IconUndo   = () => <svg {...I()}><path d="M9 14l-5-5 5-5"/><path d="M4 9h11a5 5 0 0 1 0 10H9"/></svg>;
const IconDownload = () => <svg {...I()}><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>;
const IconCopy   = () => <svg {...I()}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>;
const IconGlobe  = () => <svg {...I()}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
const IconSpeakerOn  = () => <svg {...I()}><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg>;
const IconSpeakerOff = () => <svg {...I()}><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M22 9l-5 6M17 9l5 6"/></svg>;

/* ───── mount ───── */
const root = ReactDOM.createRoot(document.getElementById("counter-root"));
root.render(<NaamJaapApp/>);
