export interface Vrat {
  id: string;
  slug: string;
  /** Display name, e.g. "Ekadashi Vrat". */
  name: string;
  /** The Hinglish search query this guide is written to answer. */
  intent: string;
  /** Primary deity worshipped. */
  deity: string;
  /** When it is observed, e.g. "Every Monday" / "11th lunar day, twice a month". */
  observedOn: string;
  excerpt: string;
  image: string;
  /** Why the vrat is kept. */
  significance: string;
  /** Step-by-step vidhi (how to observe). */
  vidhi: string[];
  benefits: string[];
  foodAllowed: string[];
  foodAvoid: string[];
  faqs: { q: string; a: string }[];
}

// Vrat (fasting) guides written for real Hinglish intent queries Indian users
// search — "ekadashi vrat kaise kare", "somvar vrat ke fayde", etc.
export const vrats: Vrat[] = [
  {
    id: "v1",
    slug: "ekadashi-vrat",
    name: "Ekadashi Vrat",
    intent: "ekadashi vrat kaise kare",
    deity: "Lord Vishnu",
    observedOn: "Ekadashi — the 11th lunar day, twice every month",
    excerpt:
      "Ekadashi vrat kaise kare aur kya khaye — a simple, complete guide to the fortnightly fast devoted to Lord Vishnu.",
    image: "/assets/temples/tirupati-balaji.jpg",
    significance:
      "Ekadashi falls on the 11th day of each lunar fortnight and is among the most sacred fasts for devotees of Lord Vishnu. Observing it is believed to purify the body and mind, dissolve past karma and bring devotion and inner steadiness. Many keep it twice a month — once in the bright fortnight (Shukla Paksha) and once in the dark (Krishna Paksha).",
    vidhi: [
      "Wake before sunrise, bathe, and take a sankalp (vow) to keep the fast.",
      "Set up Lord Vishnu's image or a Shaligram; offer tulsi leaves, flowers and a diya.",
      "Avoid all grains, rice and beans through the day — keep a nirjala (waterless) or phalahar (fruit) fast as your health allows.",
      "Spend the day in jap, reading the Vishnu Sahasranama and singing bhajans.",
      "Stay awake in the evening (jagran) where possible, and break the fast (paran) the next morning after sunrise.",
    ],
    benefits: [
      "Calms the mind and deepens devotion to Lord Vishnu",
      "Gives the digestive system a regular, gentle rest",
      "Builds discipline and steadier daily routine",
    ],
    foodAllowed: ["Fruits", "Milk and dairy", "Sabudana", "Singhara/kuttu flour", "Potatoes", "Nuts"],
    foodAvoid: ["Rice", "Wheat and grains", "Lentils and beans", "Onion and garlic", "Non-vegetarian food"],
    faqs: [
      {
        q: "Ekadashi vrat mein kya kha sakte hain?",
        a: "Phalahar — fruits, milk, sabudana, kuttu/singhara flour, potatoes and nuts. Avoid all grains, rice, lentils, onion and garlic.",
      },
      {
        q: "Ekadashi vrat ka paran kab karte hain?",
        a: "The fast is broken (paran) the next morning, on Dwadashi, after sunrise and within the prescribed paran window — ideally after offering food to Lord Vishnu.",
      },
      {
        q: "Kya rice Ekadashi par nahi khate?",
        a: "Traditionally rice and grains are avoided on Ekadashi; devotees keep a phalahar or nirjala fast instead.",
      },
    ],
  },
  {
    id: "v2",
    slug: "somvar-vrat",
    name: "Somvar Vrat (Monday Fast)",
    intent: "somvar vrat ke fayde",
    deity: "Lord Shiva",
    observedOn: "Every Monday (especially in the month of Sawan)",
    excerpt:
      "Somvar vrat ke fayde aur vidhi — the Monday fast for Lord Shiva, popular among those praying for a good marriage and family harmony.",
    image: "/assets/shiva-artwork.jpg",
    significance:
      "Monday (Somvar) is dedicated to Lord Shiva. The Somvar vrat is kept for blessings of health, a harmonious marriage and family well-being. Unmarried women often observe the Solah Somvar (sixteen Mondays) vrat praying for a good life partner. The fast is especially powerful during the holy month of Sawan.",
    vidhi: [
      "Bathe early and visit a Shiva temple or set up a lingam at home.",
      "Offer water, milk, bilva (bel) leaves, white flowers and dhatura to the Shiva lingam.",
      "Light a diya and chant 'Om Namah Shivaya' and the Mahamrityunjaya mantra.",
      "Keep a single meal in the evening (phalahar through the day), eaten after the puja.",
      "Read or listen to the Somvar vrat katha before breaking the fast.",
    ],
    benefits: [
      "Sought for a happy marriage and married life",
      "Believed to bring health, peace and removal of obstacles",
      "Strengthens devotion and self-control",
    ],
    foodAllowed: ["Fruits", "Milk", "Sabudana khichdi", "Kuttu puri", "Singhare ka halwa"],
    foodAvoid: ["Grains (except vrat flours)", "Lentils", "Onion and garlic", "Non-vegetarian food", "Alcohol"],
    faqs: [
      {
        q: "Somvar vrat kaise shuru kare?",
        a: "Begin on a Monday (ideally in Sawan or Shukla Paksha) with a sankalp, and keep it for a fixed number of weeks — sixteen Mondays for the Solah Somvar vrat.",
      },
      {
        q: "Somvar vrat mein kitni baar khana khate hain?",
        a: "Most keep phalahar through the day and eat one sattvic meal in the evening after the Shiva puja.",
      },
    ],
  },
  {
    id: "v3",
    slug: "mangalvar-vrat",
    name: "Mangalvar Vrat (Tuesday Fast)",
    intent: "mangalvar vrat hanuman ji",
    deity: "Lord Hanuman",
    observedOn: "Every Tuesday",
    excerpt:
      "Mangalvar vrat for Hanuman ji — vidhi, niyam and benefits of the Tuesday fast for strength, courage and protection.",
    image: "/assets/festivals/hanuman-jayanti.jpg",
    significance:
      "Tuesday (Mangalvar) is devoted to Lord Hanuman. The fast is kept for courage, protection from troubles, relief from the ill effects of Mangal (Mars) in the horoscope, and strength to overcome difficulties. Devotees often wear red and offer sindoor to Hanuman ji on this day.",
    vidhi: [
      "Bathe early, wear clean (ideally red) clothes and visit a Hanuman temple.",
      "Offer sindoor mixed with chameli oil, a garland of red flowers and boondi laddoo.",
      "Recite the Hanuman Chalisa and Bajrang Baan.",
      "Eat only once during the day — sweet items made of wheat/jaggery are traditional; avoid salt.",
      "Listen to the Mangalvar vrat katha and perform aarti.",
    ],
    benefits: [
      "Believed to give courage and remove fear",
      "Sought for relief from Mangal dosha and obstacles",
      "Brings protection and strength of will",
    ],
    foodAllowed: ["Wheat and jaggery items", "Fruits", "Milk", "Sweets without salt"],
    foodAvoid: ["Salt", "Non-vegetarian food", "Onion and garlic", "Alcohol"],
    faqs: [
      {
        q: "Mangalvar vrat mein namak kha sakte hain?",
        a: "Traditionally salt is avoided on the Mangalvar (Hanuman) vrat — devotees eat sweet wheat-and-jaggery preparations instead.",
      },
      {
        q: "Mangalvar vrat kitne mangalwar karna chahiye?",
        a: "It is commonly kept for 21 consecutive Tuesdays, though you may take a sankalp for any fixed number with sincere devotion.",
      },
    ],
  },
  {
    id: "v4",
    slug: "shanivar-vrat",
    name: "Shanivar Vrat (Saturday Fast)",
    intent: "shanivar vrat vidhi shani dev",
    deity: "Lord Shani (Shani Dev)",
    observedOn: "Every Saturday",
    excerpt:
      "Shanivar vrat vidhi for Shani Dev — how to keep the Saturday fast to ease Shani's effects and invite patience and discipline.",
    image: "/assets/temples/mahakaleshwar-ujjain.jpg",
    significance:
      "Saturday (Shanivar) is governed by Shani Dev, the lord of karma and justice. The fast is kept for relief during Sade Sati and Shani dhaiya, and to seek patience, discipline and protection from hardship. Shani rewards honest effort and selfless service over ritual alone.",
    vidhi: [
      "Bathe early and wear dark or black clothing.",
      "Light a mustard-oil diya under a Peepal tree or before Shani Dev.",
      "Offer black sesame (til), black urad dal, iron items and blue/black flowers.",
      "Chant the Shani mantra 'Om Sham Shanaishcharaya Namah'.",
      "Eat one meal of simple, dark-coloured food (such as urad dal) after sunset; help and feed the needy.",
    ],
    benefits: [
      "Sought for relief from Sade Sati and Shani's hardships",
      "Cultivates patience, humility and discipline",
      "Encourages charity and honest conduct",
    ],
    foodAllowed: ["Urad dal items", "Black sesame", "Fruits", "Khichdi"],
    foodAvoid: ["Non-vegetarian food", "Onion and garlic", "Alcohol", "Excess salt"],
    faqs: [
      {
        q: "Shanivar vrat kaise kare?",
        a: "Light a mustard-oil diya for Shani Dev, offer black til and urad dal, chant the Shani mantra, keep a one-meal fast, and serve the needy — Shani values righteous action.",
      },
      {
        q: "Shani dev ko khush karne ke liye kya kare?",
        a: "Honest work, patience and selfless service. Donating black sesame, mustard oil, iron and feeding the poor on Saturday are traditional remedies.",
      },
    ],
  },
  {
    id: "v5",
    slug: "sankashti-chaturthi",
    name: "Sankashti Chaturthi Vrat",
    intent: "sankashti chaturthi vrat katha ganesh",
    deity: "Lord Ganesha",
    observedOn: "Chaturthi in Krishna Paksha, every month",
    excerpt:
      "Sankashti Chaturthi vrat for Ganesh ji — the moon-sighting fast kept each month to remove obstacles and fulfil wishes.",
    image: "/assets/festivals/ganesh.jpg",
    significance:
      "Sankashti Chaturthi falls on the fourth day of the dark fortnight each month and is dedicated to Lord Ganesha, the remover of obstacles (Sankashti means 'deliverance from troubles'). The fast is broken only after sighting the moon and offering arghya. The Sankashti that falls on a Tuesday is called Angarki and is considered especially auspicious.",
    vidhi: [
      "Take a sankalp in the morning after bathing.",
      "Worship Lord Ganesha with durva grass, red flowers and modak.",
      "Keep a fast through the day — phalahar is permitted.",
      "Read the Sankashti vrat katha and chant 'Om Gam Ganapataye Namah'.",
      "Sight the moon at night, offer arghya, then break the fast.",
    ],
    benefits: [
      "Believed to remove obstacles and grant wishes",
      "Brings wisdom, focus and auspicious beginnings",
      "Deepens devotion to Lord Ganesha",
    ],
    foodAllowed: ["Modak", "Fruits", "Milk", "Sabudana", "Peanuts"],
    foodAvoid: ["Grains", "Lentils", "Onion and garlic", "Non-vegetarian food"],
    faqs: [
      {
        q: "Sankashti Chaturthi vrat kab tode?",
        a: "The fast is broken at night after sighting the moon (chandra darshan) and offering arghya to Lord Ganesha.",
      },
      {
        q: "Angarki Chaturthi kya hai?",
        a: "When Sankashti Chaturthi falls on a Tuesday it is called Angarki Chaturthi, considered especially powerful for fulfilling prayers.",
      },
    ],
  },
  {
    id: "v6",
    slug: "shukravar-vrat",
    name: "Shukravar Vrat (Friday Fast)",
    intent: "shukravar vrat santoshi mata vidhi",
    deity: "Santoshi Mata / Goddess Lakshmi",
    observedOn: "Every Friday (commonly 16 Fridays)",
    excerpt:
      "Shukravar vrat for Santoshi Mata — vidhi, niyam and the famous 'no sour food' rule of the sixteen-Friday fast.",
    image: "/assets/mantras/om-shreem-mahalakshmiyei-namaha.jpg",
    significance:
      "Friday (Shukravar) is devoted to Santoshi Mata, the goddess of contentment, and to Goddess Lakshmi. The sixteen-Friday vrat is kept for peace, prosperity and the fulfilment of heartfelt wishes. Its best-known rule is to avoid all sour (khatta) food on the fasting day.",
    vidhi: [
      "Bathe early and set up the image of Santoshi Mata.",
      "Offer gud (jaggery) and roasted chana, a kalash of water and a ghee diya.",
      "Keep a fast through the day eating only once, strictly avoiding sour food.",
      "Read the Santoshi Mata vrat katha and perform aarti.",
      "Conclude the vrat after sixteen Fridays with udyapan, feeding eight boys.",
    ],
    benefits: [
      "Sought for contentment, peace and family harmony",
      "Believed to fulfil sincere wishes and bring prosperity",
      "Encourages gratitude and simplicity",
    ],
    foodAllowed: ["Jaggery and roasted chana", "Sweet kheer", "Fruits", "Milk"],
    foodAvoid: ["Sour/khatta food", "Lemon, tamarind, curd", "Non-vegetarian food", "Onion and garlic"],
    faqs: [
      {
        q: "Shukravar vrat mein khatta kyun nahi khate?",
        a: "Avoiding sour food is the central rule of the Santoshi Mata vrat — including not eating it yourself and not serving it to others on that day.",
      },
      {
        q: "Santoshi Mata vrat ka udyapan kaise kare?",
        a: "After completing sixteen Fridays, perform udyapan by offering kheer-puri and feeding eight young boys, then conclude the vrat with gratitude.",
      },
    ],
  },
];

export const getVratBySlug = (slug: string) => vrats.find((v) => v.slug === slug);
