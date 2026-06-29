/* counter.jsx — the Naam Jaap counter React app
   Mounts into #counter-root and also fills #topbar-right with the
   language/music/export chips. Tweak panel is appended into body. */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ─────────────── safe localStorage wrapper ─────────────── */
const LS = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v==null ? d : JSON.parse(v); }catch{ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch{} },
  del(k){ try{ localStorage.removeItem(k); }catch{} },
};

/* ─────────────── i18n strings ─────────────── */
const STR = {
  en: {
    of: "of", mala: "mala", remaining: "remaining",
    session: "session", paused: "paused", live: "live",
    start: "Start", pause: "Pause", resume: "Resume",
    undo: "Undo", reset: "Reset", export: "Export",
    confirmReset: "Reset the current mala? Progress will be lost.",
    cancel: "Cancel", yesReset: "Yes, reset",
    todayMalas: "Today's malas", todayChants: "Today's chants", todayTime: "Today's time",
    lifeMalas: "Lifetime malas", lifeChants: "Lifetime chants", lifeTime: "Lifetime time",
    statsToday: "Today", statsLifetime: "Lifetime",
    recent: "Recent malas", noRecent: "Completed malas appear here.\nTap to begin.",
    mantra: "Mantra", deity: "Background",
    custom: "Custom", none: "None",
    tapToCount: "Tap the ring to count",
    keyboardHint: "or press Space",
    exportTitle: "Export your history",
    exportDesc: "Your data never leaves this device unless you choose to export it.",
    downloadCsv: "Download CSV", copyJson: "Copy JSON", copied: "Copied!",
    close: "Close",
    musicOff: "Music off", musicOn: "Music on",
    completed: "Mala complete",
    todayNothing: "Nothing yet today",
  },
  hi: {
    of: "/", mala: "माला", remaining: "शेष",
    session: "सत्र", paused: "रुका हुआ", live: "चालू",
    start: "आरंभ", pause: "रोकें", resume: "जारी",
    undo: "वापस", reset: "रीसेट", export: "निर्यात",
    confirmReset: "वर्तमान माला रीसेट करें? प्रगति खो जाएगी।",
    cancel: "रद्द", yesReset: "हाँ, रीसेट",
    todayMalas: "आज की मालाएँ", todayChants: "आज के जाप", todayTime: "आज का समय",
    lifeMalas: "कुल मालाएँ", lifeChants: "कुल जाप", lifeTime: "कुल समय",
    statsToday: "आज", statsLifetime: "कुल",
    recent: "हाल की मालाएँ", noRecent: "पूर्ण मालाएँ यहाँ दिखेंगी।\nजाप शुरू करें।",
    mantra: "मंत्र", deity: "पृष्ठभूमि",
    custom: "स्वयं का", none: "कोई नहीं",
    tapToCount: "गिनने के लिए वलय छुएँ",
    keyboardHint: "या Space दबाएँ",
    exportTitle: "अपना इतिहास निर्यात करें",
    exportDesc: "जब तक आप निर्यात न करें, आपका डेटा इस उपकरण पर ही रहता है।",
    downloadCsv: "CSV डाउनलोड", copyJson: "JSON कॉपी", copied: "कॉपी हो गया!",
    close: "बंद",
    musicOff: "संगीत बंद", musicOn: "संगीत चालू",
    completed: "माला पूर्ण",
    todayNothing: "आज अभी कुछ नहीं",
  }
};

/* ─────────────── mantra presets ─────────────── */
const MANTRAS = [
  { id:"radhe", en:"Radhe Radhe", hi:"राधे राधे", deity:"Radhe" },
  { id:"hk",    en:"Hare Krishna", hi:"हरे कृष्ण", deity:"Krishna" },
  { id:"ram",   en:"Ram Naam",     hi:"राम नाम",    deity:"Ram" },
  { id:"shiv",  en:"Om Namah Shivaya", hi:"ॐ नमः शिवाय", deity:"Shiv" },
  { id:"gayatri", en:"Gayatri Mantra", hi:"गायत्री मंत्र", deity:"Gayatri" },
  { id:"waheguru", en:"Waheguru", hi:"वाहेगुरु", deity:"Waheguru" },
];

const DEITY_TEXT = {
  "None":      "",
  "Ram":       "राम",
  "Radhe":     "राधे",
  "Shiv":      "शिव",
  "Krishna":   "कृष्ण",
  "Waheguru":  "ੴ",
  "Gayatri":   "ॐ",
};

/* ─────────────── palettes ─────────────── */
const PALETTES = {
  navy:    { glow:"#7aa7ff", glowSoft:"rgba(122,167,255,.35)", teal:"#7fe3c4", bg0:"#070a18", bg1:"#0b1024", bg2:"#0e1430", label:"Indigo Night" },
  nightfall:{ glow:"#cfd6ff", glowSoft:"rgba(207,214,255,.3)",  teal:"#a7b2d4", bg0:"#040611", bg1:"#070a1a", bg2:"#0a0e22", label:"Moonlight" },
  twilight:{ glow:"#b59aff", glowSoft:"rgba(181,154,255,.35)", teal:"#ffb9d4", bg0:"#0c0824", bg1:"#15103a", bg2:"#1a1248", label:"Twilight" },
  forest:  { glow:"#82e6c6", glowSoft:"rgba(130,230,198,.3)",  teal:"#c4e58a", bg0:"#06140f", bg1:"#0a1f17", bg2:"#0d2a1f", label:"Forest Temple" },
  dusk:    { glow:"#f3b9a3", glowSoft:"rgba(243,185,163,.3)",  teal:"#e8c887", bg0:"#170c1a", bg1:"#221426", bg2:"#2a1730", label:"Warm Dusk" },
};

/* ─────────────── bead styles ─────────────── */
const BEAD_STYLES = ["dots", "linked", "halo", "gold"];
// dots: small filled circles, current glows
// linked: small outline circles connected by thin arc — most minimal (your pick)
// halo: each bead has a soft glow blur
// gold: counted beads gold, uncounted dim navy

/* ─────────────── Web Audio: chime + ambient drone ─────────────── */
function useAudio(enabled, volume, droneOn){
  const ctxRef = useRef(null);
  const droneNodesRef = useRef(null);

  const getCtx = useCallback(()=>{
    if (!ctxRef.current){
      try{ ctxRef.current = new (window.AudioContext || window.webkitAudioContext)(); }catch{}
    }
    if (ctxRef.current && ctxRef.current.state === "suspended"){
      ctxRef.current.resume().catch(()=>{});
    }
    return ctxRef.current;
  }, []);

  const chime = useCallback((isMilestone=false)=>{
    if (!enabled) return;
    const ctx = getCtx(); if (!ctx) return;
    const now = ctx.currentTime;
    // soft sine "bowl" with subtle harmonic
    const base = isMilestone ? 528 : 392; // G4 / 528Hz milestone
    const partials = isMilestone ? [1, 2, 3] : [1, 2];
    partials.forEach((p, i)=>{
      const osc = ctx.createOscillator();
      const gn  = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = base * p;
      const peak = (isMilestone ? 0.16 : 0.10) / (i+1) * volume;
      gn.gain.setValueAtTime(0, now);
      gn.gain.linearRampToValueAtTime(peak, now + 0.015);
      gn.gain.exponentialRampToValueAtTime(0.0001, now + (isMilestone ? 1.8 : 0.85));
      osc.connect(gn).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + (isMilestone ? 2.0 : 1.0));
    });
  }, [enabled, getCtx, volume]);

  // tanpura-like drone (synthesized — no copyright)
  useEffect(()=>{
    const ctx = getCtx(); if (!ctx) return;
    if (droneOn){
      if (droneNodesRef.current) return;
      const master = ctx.createGain(); master.gain.value = 0;
      master.connect(ctx.destination);
      // gentle low-pass to soften
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 800;
      const oscs = [];
      const tones = [110, 165, 220]; // A2, E3, A3
      tones.forEach((f, idx)=>{
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = idx === 1 ? "triangle" : "sine";
        o.frequency.value = f;
        g.gain.value = idx === 0 ? 0.5 : 0.25;
        // slow LFO for subtle shimmer
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1 + idx*0.05;
        lfoGain.gain.value = 1.5;
        lfo.connect(lfoGain).connect(o.frequency);
        o.connect(g).connect(lp);
        o.start(); lfo.start();
        oscs.push(o, lfo);
      });
      lp.connect(master);
      const peak = 0.18 * volume;
      master.gain.linearRampToValueAtTime(peak, ctx.currentTime + 1.2);
      droneNodesRef.current = { master, oscs, lp };
    } else if (droneNodesRef.current){
      const { master, oscs } = droneNodesRef.current;
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      const toStop = oscs.slice();
      setTimeout(()=>{ toStop.forEach(o=>{ try{ o.stop(); }catch{} }); }, 1000);
      droneNodesRef.current = null;
    }
  }, [droneOn, getCtx, volume]);

  useEffect(()=>{
    // update drone volume live
    if (droneNodesRef.current){
      const ctx = ctxRef.current; if (!ctx) return;
      droneNodesRef.current.master.gain.linearRampToValueAtTime(0.18 * volume, ctx.currentTime + 0.2);
    }
  }, [volume]);

  return { chime, ensure: getCtx };
}

/* ─────────────── helpers ─────────────── */
const pad2 = n => String(Math.floor(n)).padStart(2, "0");
const fmtTime = sec => {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60;
  return h>0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
};
const fmtTimeShort = sec => {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60);
  if (h>0) return `${h}h ${m}m`;
  if (m>0) return `${m}m`;
  return `${sec}s`;
};
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
};
const uid = () => `mala_${Date.now()}_${Math.floor(Math.random()*999)}`;

/* migration: legacy njc-mala-rounds key */
function migrateLegacy(){
  if (LS.get("njc-migrated")) return;
  const legacy = LS.get("njc-mala-rounds", null);
  if (Array.isArray(legacy) && legacy.length){
    const sessions = legacy.map(r=>{
      const parts = (r.time || "00:00:00").split(":").map(Number);
      const secs = (parts[0]||0)*3600 + (parts[1]||0)*60 + (parts[2]||0);
      return {
        id: uid(),
        start: null, end: null,
        count: r.count || 108, size: 108,
        durationSec: secs, mantra: "Migrated", deity: "None",
        done: true, createdAt: new Date().toISOString(),
      };
    });
    const existing = LS.get("njc-sessions", []);
    LS.set("njc-sessions", [...sessions, ...existing]);
    const totals = LS.get("njc-totals", { totalMalas:0, totalChants:0, totalSeconds:0 });
    sessions.forEach(s=>{
      totals.totalMalas++;
      totals.totalChants += s.count;
      totals.totalSeconds += s.durationSec;
    });
    LS.set("njc-totals", totals);
  }
  LS.set("njc-migrated", true);
}

/* ─────────────── MalaRing component ─────────────── */
function MalaRing({ size=108, count, palette, beadStyle, breathe, rotorFlip, animIntensity }){
  // geometry
  const VB = 400;                       // viewBox
  const cx = VB/2, cy = VB/2;
  const rRing = 165;                    // radius for beads
  const rTrack = 165;                   // progress track radius (same as beads)
  const progress = Math.min(1, count/size);
  const circ = 2 * Math.PI * rTrack;
  // beads array
  const beads = useMemo(()=>{
    const arr = [];
    for (let i=0; i<size; i++){
      // start at top (12 o'clock), go clockwise
      const t = i/size;
      const a = -Math.PI/2 + t * Math.PI*2;
      arr.push({ i, x: cx + Math.cos(a)*rRing, y: cy + Math.sin(a)*rRing, angle: a });
    }
    return arr;
  }, [size]);

  // bead size scales with count so 21-bead malas have bigger beads
  const beadR = size <= 27 ? 8 : size <= 54 ? 6 : 4.2;

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} aria-label="108-bead mala progress">
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.10" />
          <stop offset="60%" stopColor={palette.glow} stopOpacity="0.02" />
          <stop offset="100%" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* center soft glow */}
      <circle cx={cx} cy={cy} r="155" fill="url(#centerGlow)" />

      {/* breathing outer aura */}
      <circle cx={cx} cy={cy} r="178" fill="none"
        stroke={palette.glow} strokeOpacity={breathe ? "0.18" : "0.10"} strokeWidth="0.5"
        style={{transition:"stroke-opacity 3s ease-in-out"}} />
      <circle cx={cx} cy={cy} r="190" fill="none"
        stroke={palette.glow} strokeOpacity={breathe ? "0.08" : "0.04"} strokeWidth="0.5"
        style={{transition:"stroke-opacity 3s ease-in-out"}} />

      {/* rotor — flips on completion */}
      <g style={{
          transformOrigin:`${cx}px ${cy}px`,
          transform: rotorFlip ? "rotate(360deg)" : "rotate(0deg)",
          transition: "transform 1.2s cubic-bezier(.4,0,.2,1)"
       }}>

        {/* base track */}
        <circle cx={cx} cy={cy} r={rTrack} fill="none"
          stroke="rgba(255,255,255,.06)" strokeWidth="0.8" />

        {/* progress arc */}
        <circle cx={cx} cy={cy} r={rTrack} fill="none"
          stroke={palette.glow} strokeOpacity="0.55" strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray={`${progress * circ} ${circ}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dasharray .35s cubic-bezier(.2,.8,.2,1)", filter: "url(#glow)" }}
        />

        {/* beads */}
        {beads.map(b => {
          const counted = b.i < count;
          const isCurrent = b.i === count;     // the next bead (will be tapped next)
          const isMarker = (b.i % 27) === 0;   // 4 dividing markers (sumeru-ish)

          let fill = "transparent", stroke = "rgba(245,244,239,.18)", r = beadR;
          let opacity = 1;

          if (beadStyle === "dots"){
            stroke = "none";
            fill = counted ? palette.glow : "rgba(245,244,239,.18)";
            opacity = counted ? 0.95 : 0.55;
            if (isCurrent){ fill = "#ffffff"; opacity = 1; }
          } else if (beadStyle === "linked"){
            fill = counted ? palette.glow : "transparent";
            stroke = counted ? palette.glow : "rgba(245,244,239,.28)";
            opacity = counted ? 0.95 : 0.7;
            if (isCurrent){ fill = "#fff"; stroke = "#fff"; opacity = 1; }
          } else if (beadStyle === "halo"){
            fill = counted ? palette.glow : "rgba(255,255,255,.15)";
            stroke = "none";
            opacity = counted ? 0.95 : 0.5;
            if (isCurrent){ fill = "#fff"; opacity = 1; }
          } else if (beadStyle === "gold"){
            fill = counted ? "#e8c887" : "rgba(245,244,239,.16)";
            stroke = "none";
            opacity = counted ? 1 : 0.55;
            if (isCurrent){ fill = "#fff"; opacity = 1; }
          }

          // bigger marker beads at 0,27,54,81
          const radius = isMarker ? r + 1.5 : r;

          return (
            <g key={b.i}>
              {/* soft halo for halo style or current bead */}
              {(beadStyle === "halo" && counted) && (
                <circle cx={b.x} cy={b.y} r={radius*2.2} fill={palette.glow} opacity="0.15" />
              )}
              {isCurrent && (
                <circle cx={b.x} cy={b.y} r={radius*2.8} fill={palette.glow} opacity="0.35"
                  style={{filter:"url(#glowStrong)"}} />
              )}
              <circle cx={b.x} cy={b.y} r={radius}
                fill={fill} stroke={stroke} strokeWidth="0.8"
                opacity={opacity}
                style={{
                  transition: animIntensity === "subtle"
                    ? "fill .3s ease, opacity .3s ease"
                    : "fill .25s cubic-bezier(.2,.8,.2,1), opacity .25s cubic-bezier(.2,.8,.2,1), r .2s ease",
                  filter: isCurrent ? "url(#glowStrong)" : (counted && beadStyle!=="dots" ? "url(#glow)" : "none")
                }}
              />
            </g>
          );
        })}

        {/* sumeru bead at top (12 o'clock) — slightly larger, gold tint */}
        <g>
          <circle cx={cx} cy={cy - rRing} r={beadR + 3} fill="none" stroke={palette.glow} strokeOpacity="0.4" strokeWidth="0.7" />
        </g>

      </g>
    </svg>
  );
}

Object.assign(window, { LS, STR, MANTRAS, DEITY_TEXT, PALETTES, BEAD_STYLES,
  useAudio, pad2, fmtTime, fmtTimeShort, todayKey, uid, migrateLegacy, MalaRing });
