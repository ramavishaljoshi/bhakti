import { Intention } from "@/lib/types";

// Each intention maps a real-life purpose ("mantra for peace", "mantra for job")
// to the mantras traditionally chanted for it. `intro` + `faqs` power the
// per-purpose landing pages, AEO summary boxes and FAQPage schema.
//
// IMPORTANT: `id` is the indexed URL slug (/intentions/<id>). Never rename an
// existing id — Google has already indexed these. New purposes are appended.
export const intentions: Intention[] = [
  {
    id: "peace",
    label: "Peace",
    seoTitle: "Mantras for Peace of Mind",
    emoji: "❤️",
    description: "Find calm, serenity and inner stillness.",
    color: "from-rose-400 to-pink-500",
    mantraIds: ["om-namah-shivaya", "shree-ram-jai-ram", "om-sai-namo-namaha"],
    intro:
      "Mantras for peace (shanti) are chanted to calm a restless mind, ease anxiety and return to inner stillness. In the Hindu tradition, the steady repetition of a sacred sound settles the breath and the nervous system — which is why Om Namah Shivaya and Shree Ram Jai Ram are turned to in moments of worry.",
    keywords: ["mantra for peace of mind", "shanti mantra", "mantra to reduce anxiety", "mann ki shanti ke liye mantra"],
    faqs: [
      { q: "Which mantra is best for peace of mind?", a: "Om Namah Shivaya is the most widely chanted mantra for peace — its slow, five-syllable rhythm calms the mind. Shree Ram Jai Ram and Om Sai Namo Namaha are also traditionally used for inner calm." },
      { q: "How many times should I chant a peace mantra?", a: "Chant one mala (108 repetitions) with a steady breath, ideally in the early morning. Even 5–10 minutes of unhurried repetition is enough to feel calmer." },
      { q: "When is the best time to chant for peace?", a: "Brahma Muhurta (roughly 4–6 am) is considered ideal, but any quiet moment works. Consistency matters more than timing." },
    ],
  },
  {
    id: "prosperity",
    label: "Prosperity",
    seoTitle: "Mantras for Prosperity & Wealth",
    emoji: "💰",
    description: "Invite abundance and material wellbeing.",
    color: "from-amber-400 to-yellow-500",
    mantraIds: ["om-shreem-mahalakshmiyei-namaha", "om-gam-ganapataye-namaha"],
    intro:
      "Mantras for prosperity (samriddhi) invoke Goddess Lakshmi, the deity of abundance, wealth and grace. Devotees chant them to attract material wellbeing, remove obstacles to fortune and cultivate a mindset of gratitude — especially on Fridays and during Diwali.",
    keywords: ["mantra for prosperity", "lakshmi mantra for wealth", "mantra for money", "dhan prapti mantra"],
    faqs: [
      { q: "Which mantra attracts wealth and prosperity?", a: "Om Shreem Mahalakshmiyei Namaha is the classic Lakshmi mantra for prosperity. Om Gam Ganapataye Namaha is often chanted first to remove obstacles to abundance." },
      { q: "When should I chant the Lakshmi mantra?", a: "Fridays and the Diwali period are traditionally most auspicious, chanted 108 times facing east after a bath." },
      { q: "Does chanting guarantee wealth?", a: "No. These are devotional practices believed to cultivate focus, gratitude and effort — not guarantees of financial outcomes." },
    ],
  },
  {
    id: "child",
    label: "Children (Santaan)",
    seoTitle: "Mantras for Children & Progeny",
    emoji: "👶",
    description: "Blessings for parenthood, progeny and a child's wellbeing.",
    color: "from-sky-400 to-blue-500",
    mantraIds: ["hare-krishna-maha-mantra", "om-gam-ganapataye-namaha", "om-namah-shivaya"],
    intro:
      "Mantras for children (santaan prapti) are chanted by couples seeking the blessing of parenthood and by parents praying for a child's health and bright future. Krishna — beloved in his child form as Bal Gopal — and Ganesha are traditionally invoked for progeny and protection.",
    keywords: ["mantra for children", "santaan prapti mantra", "mantra for baby", "putra prapti mantra"],
    faqs: [
      { q: "Which mantra is chanted for having a child?", a: "The Hare Krishna Maha Mantra (Krishna as Bal Gopal) and Om Gam Ganapataye Namaha are traditionally chanted for santaan prapti (the blessing of a child)." },
      { q: "Can both parents chant together?", a: "Yes. Chanting together, especially in the morning, is considered a shared devotional practice." },
      { q: "Is this a substitute for medical advice?", a: "No. These practices are for devotion and comfort and should complement, never replace, qualified medical care." },
    ],
  },
  {
    id: "career",
    label: "Career",
    seoTitle: "Mantras for Career Growth",
    emoji: "💼",
    description: "Growth, opportunity and professional success.",
    color: "from-indigo-400 to-violet-500",
    mantraIds: ["om-gam-ganapataye-namaha", "hanuman-chalisa", "om-shreem-mahalakshmiyei-namaha"],
    intro:
      "Mantras for career growth are chanted to remove obstacles, build courage and invite opportunity in professional life. Ganesha clears the path, Hanuman grants strength and confidence, and Lakshmi brings the fruits of effort — a combination devotees turn to before interviews, promotions and new ventures.",
    keywords: ["mantra for career growth", "mantra for success at work", "career me safalta mantra", "mantra for promotion"],
    faqs: [
      { q: "Which mantra is best for career growth?", a: "Om Gam Ganapataye Namaha removes obstacles, the Hanuman Chalisa builds courage and confidence, and Om Shreem Mahalakshmiyei Namaha invites the rewards of hard work." },
      { q: "How is 'career' different from 'job'?", a: "Career mantras focus on long-term growth and advancement; if you are specifically seeking employment, see our mantras for a job (naukri)." },
      { q: "When should I chant for career success?", a: "Wednesday mornings (for Ganesha) or before any important professional milestone, 108 times with focus." },
    ],
  },
  {
    id: "education",
    label: "Education",
    seoTitle: "Mantras for Education & Studies",
    emoji: "📚",
    description: "Knowledge, focus and academic clarity.",
    color: "from-teal-400 to-emerald-500",
    mantraIds: ["saraswati-vandana", "gayatri-mantra"],
    intro:
      "Mantras for education invoke Saraswati, the goddess of knowledge, and the Gayatri Mantra's prayer for a bright, focused intellect. Students chant them before study and exams to sharpen memory, concentration and clarity of thought.",
    keywords: ["mantra for education", "saraswati mantra for studies", "mantra for exams", "padhai me man lagane ka mantra"],
    faqs: [
      { q: "Which mantra helps in studies and exams?", a: "The Saraswati Vandana and the Gayatri Mantra are the two most recommended for concentration, memory and academic clarity." },
      { q: "When should students chant?", a: "Before beginning study, and especially during Vasant Panchami (Saraswati's festival). Early morning chanting sets the tone for the day." },
      { q: "How does chanting help with focus?", a: "The rhythmic repetition trains sustained attention and calms exam anxiety, making it easier to concentrate." },
    ],
  },
  {
    id: "health",
    label: "Health",
    seoTitle: "Mantras for Health & Healing",
    emoji: "🏥",
    description: "Healing, vitality and wellbeing.",
    color: "from-green-400 to-emerald-600",
    mantraIds: ["mahamrityunjaya-mantra", "hanuman-chalisa"],
    intro:
      "Mantras for health center on the Mahamrityunjaya Mantra — the great 'death-conquering' prayer to Lord Shiva for healing, longevity and freedom from fear. Chanted during illness or for a loved one's recovery, it is one of the most powerful wellbeing mantras in the Vedas.",
    keywords: ["mantra for health", "mahamrityunjaya mantra for healing", "mantra for good health", "arogya mantra"],
    faqs: [
      { q: "Which mantra is best for health and healing?", a: "The Mahamrityunjaya Mantra (Om Tryambakam Yajamahe…) is the foremost mantra for health, vitality and recovery. The Hanuman Chalisa is also chanted for strength during illness." },
      { q: "Can I chant for someone else's health?", a: "Yes. It is a common practice to chant the Mahamrityunjaya Mantra on behalf of a sick family member." },
      { q: "Does it replace medical treatment?", a: "No. It is a devotional and calming practice meant to support — never replace — proper medical care." },
    ],
  },
  {
    id: "marriage",
    label: "Marriage",
    seoTitle: "Mantras for Marriage & a Life Partner",
    emoji: "💍",
    description: "Harmony, an ideal partner and blessings for union.",
    color: "from-pink-400 to-rose-500",
    mantraIds: ["om-namah-shivaya", "shree-ram-jai-ram"],
    intro:
      "Mantras for marriage are chanted for an ideal life partner, for removing delays in vivah, and for harmony within a marriage. Shiva and Parvati represent the ideal union, so Om Namah Shivaya is favoured — especially by those praying for a good match or marital peace.",
    keywords: ["mantra for marriage", "mantra for early marriage", "sheeghra vivah mantra", "mantra for good husband or wife"],
    faqs: [
      { q: "Which mantra is chanted for marriage?", a: "Om Namah Shivaya (invoking Shiva–Parvati, the ideal couple) is the most common, with Shree Ram Jai Ram chanted for harmony and righteousness in the union." },
      { q: "Is there a mantra to remove delays in marriage?", a: "Devotees facing vivah delays traditionally chant Om Namah Shivaya on Mondays, along with fasting and prayer to Parvati." },
      { q: "Can married couples chant for harmony?", a: "Yes — chanting together is a traditional way to invite peace and understanding into a marriage." },
    ],
  },
  {
    id: "protection",
    label: "Protection",
    seoTitle: "Mantras for Protection from Negativity",
    emoji: "🙏",
    description: "Shield from negativity, fear and obstacles.",
    color: "from-orange-400 to-red-500",
    mantraIds: ["hanuman-chalisa", "om-dum-durgayei-namaha", "mahamrityunjaya-mantra"],
    intro:
      "Mantras for protection (suraksha) call on Hanuman and Goddess Durga — the fierce guardians who remove fear, negativity and obstacles. The Hanuman Chalisa is chanted for courage and a protective shield, while the Durga mantra invokes the divine mother's strength.",
    keywords: ["mantra for protection", "hanuman chalisa for protection", "mantra to remove fear", "suraksha mantra", "mantra against negativity"],
    faqs: [
      { q: "Which mantra gives protection from negativity?", a: "The Hanuman Chalisa is the most trusted for protection and courage. Om Dum Durgayei Namaha invokes Goddess Durga's shielding power, and the Mahamrityunjaya Mantra removes fear." },
      { q: "When should I chant for protection?", a: "Tuesdays and Saturdays (Hanuman's days) are traditional, and the Chalisa can be recited any time you feel fear or negativity." },
      { q: "Is there a mantra to remove fear specifically?", a: "Yes — verse 24 of the Hanuman Chalisa ('Bhoot pishaach nikat nahi aavai') is chanted precisely to dispel fear and negative energy." },
    ],
  },
  {
    id: "meditation",
    label: "Meditation",
    seoTitle: "Mantras for Meditation & Focus",
    emoji: "🧘",
    description: "Deepen stillness and spiritual focus.",
    color: "from-violet-400 to-purple-500",
    mantraIds: ["om-namah-shivaya", "gayatri-mantra"],
    intro:
      "Mantras for meditation give the mind a single point of focus, making it easier to enter stillness. Om Namah Shivaya and the Gayatri Mantra are ideal — their steady cadence anchors the breath and quiets mental chatter during dhyana.",
    keywords: ["mantra for meditation", "best mantra to meditate", "dhyana mantra", "mantra for concentration"],
    faqs: [
      { q: "Which mantra is best for meditation?", a: "Om Namah Shivaya is the classic meditation mantra for its calming five-syllable rhythm. The Gayatri Mantra is chosen when the aim is clarity and inner light." },
      { q: "Should I chant aloud or silently while meditating?", a: "Begin aloud to settle in, then move to a whisper and finally silent (mental) repetition — this deepens absorption." },
      { q: "How long should a mantra meditation last?", a: "Even 10–15 minutes daily builds a strong practice; one mala (108 repetitions) is a natural unit." },
    ],
  },
  {
    id: "happiness",
    label: "Happiness",
    seoTitle: "Mantras for Happiness & Joy",
    emoji: "😊",
    description: "Joy, contentment and a light heart.",
    color: "from-yellow-400 to-amber-500",
    mantraIds: ["hare-krishna-maha-mantra", "shree-ram-jai-ram"],
    intro:
      "Mantras for happiness awaken joy and devotion in the heart. The Hare Krishna Maha Mantra is sung the world over to lift the spirits, while Shree Ram Jai Ram brings contentment and a light, grateful heart.",
    keywords: ["mantra for happiness", "mantra for joy", "khushi ke liye mantra", "mantra for positive mood"],
    faqs: [
      { q: "Which mantra brings happiness?", a: "The Hare Krishna Maha Mantra is famed for cultivating joy and devotion, and Shree Ram Jai Ram brings a calm, contented happiness." },
      { q: "Can I sing these mantras aloud?", a: "Absolutely — kirtan (melodic group chanting) of the Hare Krishna mantra is one of the most joyful forms of practice." },
      { q: "When should I chant for happiness?", a: "Any time, though sunrise and sunset chanting is especially uplifting." },
    ],
  },
  {
    id: "success",
    label: "Success",
    seoTitle: "Mantras for Success & Victory",
    emoji: "🌟",
    description: "Achievement and fulfilment of goals.",
    color: "from-amber-400 to-orange-500",
    mantraIds: ["om-gam-ganapataye-namaha", "om-saravana-bhava", "om-dum-durgayei-namaha"],
    intro:
      "Mantras for success are chanted before any important endeavour to remove obstacles and invite victory. Ganesha (the lord of beginnings), Murugan (the warrior of valour) and Durga (strength) are invoked when you seek achievement and the fulfilment of a goal.",
    keywords: ["mantra for success", "mantra for victory", "safalta ke liye mantra", "mantra before exam or interview"],
    faqs: [
      { q: "Which mantra is chanted for success?", a: "Om Gam Ganapataye Namaha is chanted before new ventures to clear obstacles; Om Saravana Bhava (Murugan) grants courage and victory." },
      { q: "Should I chant before starting something new?", a: "Yes — invoking Ganesha before any new venture is one of the most established Hindu customs." },
      { q: "Is a success mantra different from a career mantra?", a: "They overlap; success mantras suit any goal (exams, ventures, competitions), while career mantras focus on professional growth." },
    ],
  },
  {
    id: "gratitude",
    label: "Gratitude",
    seoTitle: "Mantras for Gratitude & Devotion",
    emoji: "🌸",
    description: "Thankfulness and divine connection.",
    color: "from-rose-400 to-fuchsia-500",
    mantraIds: ["hare-krishna-maha-mantra", "om-sai-namo-namaha"],
    intro:
      "Mantras for gratitude open the heart in thankfulness and deepen the sense of divine connection. Chanting the Hare Krishna Maha Mantra or Om Sai Namo Namaha turns everyday devotion into a practice of gratitude (kritagyata).",
    keywords: ["mantra for gratitude", "mantra for thankfulness", "kritagyata mantra", "mantra for devotion"],
    faqs: [
      { q: "Which mantra expresses gratitude?", a: "The Hare Krishna Maha Mantra and Om Sai Namo Namaha are both chanted as heartfelt expressions of devotion and gratitude." },
      { q: "How do I chant with gratitude?", a: "Begin by recalling something you are thankful for, then chant slowly, letting each repetition be an offering." },
      { q: "Is gratitude chanting a daily practice?", a: "Yes — a short daily practice of grateful chanting is a gentle, powerful habit." },
    ],
  },
  {
    id: "spiritual-growth",
    label: "Spiritual Growth",
    seoTitle: "Mantras for Spiritual Growth",
    emoji: "🪷",
    description: "Awakening, self-realisation and inner evolution.",
    color: "from-purple-400 to-indigo-500",
    mantraIds: ["gayatri-mantra", "om-namah-shivaya", "hare-krishna-maha-mantra"],
    intro:
      "Mantras for spiritual growth support the inner journey toward self-realisation. The Gayatri Mantra illumines the intellect, Om Namah Shivaya dissolves the ego into pure awareness, and the Hare Krishna mantra opens the heart in devotion — three time-tested paths of sadhana.",
    keywords: ["mantra for spiritual growth", "mantra for self realisation", "sadhana mantra", "mantra for awakening"],
    faqs: [
      { q: "Which mantra supports spiritual growth?", a: "The Gayatri Mantra (wisdom), Om Namah Shivaya (self-inquiry) and the Hare Krishna Maha Mantra (devotion) are the three most-followed paths for inner growth." },
      { q: "How do I build a daily sadhana?", a: "Choose one mantra, a fixed time and place, and one mala a day. Consistency over months is what deepens the practice." },
      { q: "Can I chant more than one mantra?", a: "It's usually best to stay with one primary mantra for depth, though many devotees keep a short additional prayer." },
    ],
  },
  // --- New purposes (appended; distinct search intents from career/child) ---
  {
    id: "job",
    label: "Job (Naukri)",
    seoTitle: "Mantras for Getting a Job",
    emoji: "🧑‍💼",
    description: "Land a new job, clear interviews and find employment.",
    color: "from-cyan-400 to-blue-500",
    mantraIds: ["om-gam-ganapataye-namaha", "hanuman-chalisa", "om-shreem-mahalakshmiyei-namaha"],
    intro:
      "Mantras for a job (naukri) are chanted by those seeking employment — before interviews, applications and results. Ganesha removes the obstacles blocking the right opportunity, Hanuman grants the confidence to perform, and Lakshmi supports steady livelihood.",
    keywords: ["mantra for job", "mantra to get a job", "naukri ke liye mantra", "mantra for interview success"],
    faqs: [
      { q: "Which mantra helps in getting a job?", a: "Om Gam Ganapataye Namaha (to clear obstacles) chanted with the Hanuman Chalisa (for confidence) is the traditional combination for finding a job and clearing interviews." },
      { q: "What should I chant before an interview?", a: "Chant Om Gam Ganapataye Namaha 11 or 21 times calmly before leaving, to steady the mind and remove nervousness." },
      { q: "How is this different from career mantras?", a: "Job mantras focus on securing employment (naukri); career mantras focus on long-term growth once you are working." },
    ],
  },
  {
    id: "business",
    label: "Business (Vyapar)",
    seoTitle: "Mantras for Business Growth",
    emoji: "📈",
    description: "Grow a business, invite customers and profit.",
    color: "from-lime-400 to-green-500",
    mantraIds: ["om-shreem-mahalakshmiyei-namaha", "om-gam-ganapataye-namaha", "om-dum-durgayei-namaha"],
    intro:
      "Mantras for business (vyapar vriddhi) are chanted by entrepreneurs and shopkeepers to attract customers, remove hurdles and grow profit. Lakshmi (wealth) and Ganesha (auspicious beginnings) are invoked together — a pairing seen on countless Indian shopfronts, especially at Diwali.",
    keywords: ["mantra for business", "mantra for business growth", "vyapar vriddhi mantra", "mantra to attract customers"],
    faqs: [
      { q: "Which mantra is best for business growth?", a: "Om Shreem Mahalakshmiyei Namaha (Lakshmi) with Om Gam Ganapataye Namaha (Ganesha) is the classic combination for business prosperity and removing obstacles." },
      { q: "When should business owners chant?", a: "Fridays and the Diwali period are most auspicious; many open their shop each day after a brief prayer to Lakshmi and Ganesha." },
      { q: "Does it help attract customers?", a: "These are devotional practices believed to build focus and auspiciousness — best paired with genuine effort and good service." },
    ],
  },
  {
    id: "family",
    label: "Family Harmony",
    seoTitle: "Mantras for Family Harmony",
    emoji: "🏡",
    description: "Peace, unity and blessings for the whole family.",
    color: "from-orange-300 to-amber-500",
    mantraIds: ["shree-ram-jai-ram", "hare-krishna-maha-mantra", "om-gam-ganapataye-namaha"],
    intro:
      "Mantras for family harmony are chanted for peace, unity and understanding within the home. The Ram family is the model of an ideal household, so Shree Ram Jai Ram is favoured — sung together, it brings warmth and resolves discord among family members.",
    keywords: ["mantra for family", "mantra for family harmony", "parivar sukh shanti mantra", "mantra for family unity"],
    faqs: [
      { q: "Which mantra brings peace to the family?", a: "Shree Ram Jai Ram is chanted for family harmony (invoking the ideal household of Ram, Sita and Lakshman), often with the Hare Krishna mantra for warmth and love." },
      { q: "Can the whole family chant together?", a: "Yes — a short daily family chanting or aarti is one of the best ways to build unity and shared peace." },
      { q: "Is there a mantra to resolve family conflict?", a: "Chanting Shree Ram Jai Ram together, and Om Gam Ganapataye Namaha to remove obstacles, is the traditional approach to easing discord." },
    ],
  },
];

export const INTENTION_DISCLAIMER =
  "Recommendations are based on traditional spiritual practices and are intended for personal devotion. They are not guarantees of outcomes.";

export const getIntentionById = (id: string) =>
  intentions.find((i) => i.id === id);

/** Alias — intentions are addressed by their `id` slug in the URL. */
export const getIntentionBySlug = getIntentionById;
