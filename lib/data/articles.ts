export interface ArticleSection {
  heading: string;
  body: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  /** The Hinglish search query this article is written to answer. */
  intent: string;
  excerpt: string;
  category: string;
  readTime: string;
  /** ISO date (YYYY-MM-DD) of publication, used for Article schema. */
  date: string;
  image: string;
  intro: string;
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
}

// Articles are written to answer real Hinglish intent queries Indian users
// type into search ("ekadashi vrat kaise kare", "hanuman chalisa ke fayde").
// The `intent` field is the target query; keep titles natural but keyword-rich.
export const articles: Article[] = [
  {
    id: "ar1",
    slug: "power-of-daily-jap",
    title: "The Power of Daily Jap: Why Mantra Repetition Heals the Mind",
    intent: "daily jap ke fayde",
    excerpt:
      "Roz mantra jaap karne ke fayde — how a few minutes of repetition calms the nervous system and sharpens focus.",
    category: "Practice",
    readTime: "5 min",
    date: "2026-06-01",
    image: "/assets/mantras/hare-krishna-maha-mantra.jpg",
    intro:
      "Jap — the repetition of a sacred mantra — is one of the oldest contemplative practices in the world. Whether you hold a mala or simply close your eyes, daily jap trains the mind to settle. Here is the tradition and the science behind it, plus how to build a habit that lasts.",
    sections: [
      {
        heading: "Jap kya hota hai?",
        body: [
          "Jap is the rhythmic repetition of a mantra — a name of the divine or a sacred sound like Om. Traditionally it is counted on a mala of 108 beads, completing one round (one 'mala') at a time.",
          "The point is not speed or count, but attention. Each repetition gently returns a wandering mind to a single anchor.",
        ],
      },
      {
        heading: "Daily jap ke fayde (benefits)",
        body: [
          "Modern research on repetitive, rhythmic practices shows lower cortisol, slower breathing, and improved attention. Devotees have described the same effects for centuries: a quieter mind and steadier emotions.",
          "Done first thing in the morning, jap sets a calm baseline for the whole day — before the phone, the news, and the to-do list pull you in different directions.",
        ],
      },
      {
        heading: "Jap kaise kare — a simple routine",
        body: [
          "Sit comfortably with a straight spine, ideally facing east at sunrise. Choose one mantra and stay with it.",
          "Start with one mala (108 repetitions) — about five minutes. Let the breath be natural. When the mind drifts, simply come back to the mantra without judgement.",
        ],
      },
    ],
    faqs: [
      {
        q: "Jap ke liye kitni mala karni chahiye?",
        a: "Begin with one mala (108 repetitions) daily. As the habit settles you can grow to 3, 11, or more — consistency matters far more than the count.",
      },
      {
        q: "Kya bina mala ke jap kar sakte hain?",
        a: "Yes. A mala helps you keep count without thinking, but you can also use your fingers or simply set a timer and repeat the mantra with attention.",
      },
    ],
  },
  {
    id: "ar2",
    slug: "ekadashi-vrat-kaise-kare",
    title: "Ekadashi Vrat Kaise Kare: Niyam, Vidhi aur Fayde",
    intent: "ekadashi vrat kaise kare",
    excerpt:
      "Complete guide to keeping the Ekadashi fast — rules, what to eat, what to avoid, and the spiritual significance.",
    category: "Vrat",
    readTime: "6 min",
    date: "2026-06-05",
    image: "/assets/temples/tirupati-balaji.jpg",
    intro:
      "Ekadashi — the eleventh day of each lunar fortnight — is considered one of the most powerful days for fasting in the Hindu tradition. It falls twice a month and is especially dear to devotees of Lord Vishnu. Here is how to observe it correctly.",
    sections: [
      {
        heading: "Ekadashi kya hai?",
        body: [
          "Ekadashi is the 11th tithi (lunar day) of both the waxing (Shukla) and waning (Krishna) phases of the moon, so it occurs twice every month.",
          "Fasting on this day is believed to purify the body and mind and to bring the blessings of Lord Vishnu.",
        ],
      },
      {
        heading: "Vrat ke niyam (rules of the fast)",
        body: [
          "The fast traditionally begins at sunrise on Ekadashi and is broken the next morning on Dwadashi, within a set window after sunrise (the 'parana' time).",
          "Grains, rice, and lentils are avoided. Many devotees keep a nirjala (waterless) fast; others take fruits, milk, and 'vrat-friendly' foods like sabudana, kuttu, and singhara.",
          "Avoid onion, garlic, and tamasic foods. Keep the day simple — chanting, reading, and rest are encouraged.",
        ],
      },
      {
        heading: "Vrat vidhi (how to observe)",
        body: [
          "Wake before sunrise, bathe, and take a sankalp (resolve) to keep the fast. Light a diya before Lord Vishnu or Krishna.",
          "Chant 'Om Namo Bhagavate Vasudevaya' or read the Vishnu Sahasranama through the day. Break the fast at the prescribed parana time on Dwadashi with simple sattvic food.",
        ],
      },
    ],
    faqs: [
      {
        q: "Ekadashi vrat me kya kha sakte hain?",
        a: "Fruits, milk, dry fruits, and vrat-special foods like sabudana khichdi, kuttu atta, and singhara. Grains, rice, lentils, onion, and garlic are avoided.",
      },
      {
        q: "Ekadashi vrat kab tode (when to break the fast)?",
        a: "The fast is broken the next morning on Dwadashi, within the parana window after sunrise. Breaking it within this time is considered important.",
      },
      {
        q: "Kya beemar log Ekadashi vrat rakh sakte hain?",
        a: "Those who are unwell, pregnant, or on medication can keep a partial fast with fruits and milk, or skip it — health comes first in the tradition.",
      },
    ],
  },
  {
    id: "ar3",
    slug: "hanuman-chalisa-ke-fayde",
    title: "Hanuman Chalisa Ke Fayde: Daily Padhne Ke Labh",
    intent: "hanuman chalisa ke fayde",
    excerpt:
      "Why reading the Hanuman Chalisa every day brings courage, focus and protection — plus the best time to recite it.",
    category: "Mantra",
    readTime: "5 min",
    date: "2026-06-10",
    image: "/assets/mantras/hanuman-chalisa.jpg",
    intro:
      "The Hanuman Chalisa, written by Goswami Tulsidas, is forty verses praising Lord Hanuman — the deity of strength, devotion, and fearlessness. Millions recite it daily. Here is what makes it so beloved and how to get the most from it.",
    sections: [
      {
        heading: "Hanuman Chalisa kya hai?",
        body: [
          "'Chalisa' means forty — the prayer has forty chaupais (verses) framed by opening and closing dohas. It tells of Hanuman's powers, his devotion to Lord Rama, and his role as a remover of obstacles.",
        ],
      },
      {
        heading: "Daily padhne ke fayde",
        body: [
          "Devotees report greater courage and calm in the face of fear or anxiety — Hanuman is invoked precisely for protection and inner strength.",
          "The rhythm and repetition of the verses act like a focusing practice, steadying the mind much like jap. Reciting it as a group amplifies the sense of devotion and community.",
        ],
      },
      {
        heading: "Best time aur tarika (how and when)",
        body: [
          "Tuesday and Saturday are traditionally dedicated to Hanuman, but daily recitation any morning or evening is welcomed.",
          "Sit facing an image of Hanuman, light a diya, and recite with attention to the meaning. Even one heartfelt reading is better than many rushed ones.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hanuman Chalisa kitni baar padhni chahiye?",
        a: "Once daily with devotion is enough. On Tuesdays and Saturdays some devotees recite it 7 or 11 times, but consistency matters more than count.",
      },
      {
        q: "Hanuman Chalisa padhne ka sahi samay kya hai?",
        a: "Early morning after a bath, or in the evening at dusk. Tuesday and Saturday are considered especially auspicious.",
      },
    ],
  },
  {
    id: "ar4",
    slug: "rahu-kaal-kya-hota-hai",
    title: "Rahu Kaal Kya Hota Hai aur Isme Kya Nahi Karna Chahiye",
    intent: "rahu kaal kya hota hai",
    excerpt:
      "Understand Rahu Kaal — the daily inauspicious period — how it is calculated, and what to avoid during this time.",
    category: "Panchang",
    readTime: "4 min",
    date: "2026-06-15",
    image: "/assets/festivals/makar-sankranti.jpg",
    intro:
      "Rahu Kaal is a roughly 90-minute window each day considered inauspicious for starting important work. It is one of the most-checked elements of the daily Panchang. Here is what it means and how to work around it.",
    sections: [
      {
        heading: "Rahu Kaal kya hai?",
        body: [
          "Rahu Kaal is a period ruled by the shadow planet Rahu. Daytime (sunrise to sunset) is divided into eight equal parts, and one of these parts is Rahu Kaal — which part depends on the weekday.",
        ],
      },
      {
        heading: "Rahu Kaal me kya nahi karna chahiye",
        body: [
          "Traditionally, new and important beginnings are avoided during Rahu Kaal — signing deals, starting a journey, beginning a new venture, or major purchases.",
          "Routine work, ongoing tasks, and prayer are considered fine. Many people simply chant or do jap during this window.",
        ],
      },
      {
        heading: "Aaj ka Rahu Kaal kaise pata kare",
        body: [
          "Rahu Kaal changes daily with sunrise and sunset times and your location. Check today's exact timing on the daily Panchang.",
        ],
      },
    ],
    faqs: [
      {
        q: "Rahu Kaal kitne baje hota hai?",
        a: "It varies by weekday and location, but it is always one of the eight equal parts of daytime — roughly 90 minutes. Check the daily Panchang for today's exact time.",
      },
      {
        q: "Kya Rahu Kaal me puja kar sakte hain?",
        a: "Yes. Prayer, jap, and ongoing routine work are considered fine. Only new or important beginnings are traditionally postponed.",
      },
    ],
  },
  {
    id: "ar5",
    slug: "gayatri-mantra-ka-arth",
    title: "Gayatri Mantra Ka Arth aur Jaap Ke Niyam",
    intent: "gayatri mantra ka arth",
    excerpt:
      "The meaning of the Gayatri Mantra, line by line, and the simple rules for chanting it correctly.",
    category: "Mantra",
    readTime: "5 min",
    date: "2026-06-20",
    image: "/assets/mantras/gayatri-mantra.jpg",
    intro:
      "The Gayatri Mantra is among the most revered verses in the Vedas — a prayer for the awakening of the intellect. Understanding its meaning deepens the practice. Here is a simple breakdown and the rules for chanting.",
    sections: [
      {
        heading: "Gayatri Mantra",
        body: [
          "Om Bhur Bhuvah Swah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat.",
          "It is a prayer to Savitr, the divine light of the Sun, asking it to illuminate and guide our intellect.",
        ],
      },
      {
        heading: "Line by line arth (meaning)",
        body: [
          "Om Bhur Bhuvah Swah — across the physical, mental, and spiritual realms.",
          "Tat Savitur Varenyam — that supreme, adorable divine light.",
          "Bhargo Devasya Dhimahi — we meditate upon that radiant glory.",
          "Dhiyo Yo Nah Prachodayat — may it inspire and awaken our intellect.",
        ],
      },
      {
        heading: "Jaap ke niyam (rules)",
        body: [
          "Best chanted at the three sandhya times — dawn, noon, and dusk — facing east at sunrise.",
          "Sit clean and quiet, with a steady spine. Begin with a few repetitions and grow gradually. Pronouncing each word with care matters more than speed.",
        ],
      },
    ],
    faqs: [
      {
        q: "Gayatri Mantra ka jaap kab karna chahiye?",
        a: "Traditionally at the three sandhya times — sunrise, midday, and sunset. Sunrise is considered the most powerful.",
      },
      {
        q: "Gayatri Mantra kitni baar jaap kare?",
        a: "Start with 3, 11, or 21 repetitions and build up to one mala (108) as your practice settles.",
      },
    ],
  },
  {
    id: "ar6",
    slug: "shani-dev-ko-kaise-prasann-kare",
    title: "Shani Dev Ko Kaise Prasann Kare: Upay aur Niyam",
    intent: "shani dev ko kaise prasann kare",
    excerpt:
      "Simple, sincere ways to honour Shani Dev — the right day, offerings, and the spirit behind the practice.",
    category: "Devotion",
    readTime: "5 min",
    date: "2026-06-25",
    image: "/assets/temples/mahakaleshwar-ujjain.jpg",
    intro:
      "Shani Dev — the lord of karma and justice — is both feared and deeply respected. The tradition teaches that Shani rewards honest effort and humility. Here are the time-honoured ways devotees seek his grace.",
    sections: [
      {
        heading: "Shani Dev kaun hai?",
        body: [
          "Shani is the deity associated with the planet Saturn, governing discipline, patience, and the fruits of one's actions. He is said to test, not punish — and to bless those who act with integrity.",
        ],
      },
      {
        heading: "Shani ko prasann karne ke upay",
        body: [
          "Saturday is dedicated to Shani Dev. Devotees light a mustard-oil (sarson tel) diya, offer black sesame, and recite the Shani mantra or chalisa.",
          "Acts of service — feeding the needy, helping labourers, honesty in work — are considered the truest way to please Shani, who values righteous conduct above ritual.",
        ],
      },
      {
        heading: "Niyam (the right spirit)",
        body: [
          "The tradition is clear that Shani cannot be 'bribed' with offerings. Sincerity, patience, and fairness in daily life are what earn his grace.",
        ],
      },
    ],
    faqs: [
      {
        q: "Shani Dev ki puja kis din kare?",
        a: "Saturday (Shanivar) is dedicated to Shani Dev. A mustard-oil diya and black sesame are traditional offerings.",
      },
      {
        q: "Shani Dev ko prasann karne ka sabse achha tarika kya hai?",
        a: "Honest conduct, patience, and selfless service — feeding and helping those in need. Shani is said to value righteous action over ritual.",
      },
    ],
  },
];

export const getArticleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);
