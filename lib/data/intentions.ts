import { Intention } from "@/lib/types";

export const intentions: Intention[] = [
  {
    id: "peace",
    label: "Peace",
    emoji: "❤️",
    description: "Find calm, serenity and inner stillness.",
    color: "from-rose-400 to-pink-500",
    mantraIds: ["om-namah-shivaya", "shree-ram-jai-ram", "om-sai-namo-namaha"],
  },
  {
    id: "prosperity",
    label: "Prosperity",
    emoji: "💰",
    description: "Invite abundance and material wellbeing.",
    color: "from-amber-400 to-yellow-500",
    mantraIds: ["om-shreem-mahalakshmiyei-namaha"],
  },
  {
    id: "child",
    label: "Child",
    emoji: "👶",
    description: "Blessings for parenthood and progeny.",
    color: "from-sky-400 to-blue-500",
    mantraIds: ["hare-krishna-maha-mantra", "om-gam-ganapataye-namaha"],
  },
  {
    id: "career",
    label: "Career",
    emoji: "💼",
    description: "Growth, opportunity and professional success.",
    color: "from-indigo-400 to-violet-500",
    mantraIds: ["om-gam-ganapataye-namaha", "hanuman-chalisa", "om-shreem-mahalakshmiyei-namaha"],
  },
  {
    id: "education",
    label: "Education",
    emoji: "📚",
    description: "Knowledge, focus and academic clarity.",
    color: "from-teal-400 to-emerald-500",
    mantraIds: ["saraswati-vandana", "gayatri-mantra"],
  },
  {
    id: "health",
    label: "Health",
    emoji: "🏥",
    description: "Healing, vitality and wellbeing.",
    color: "from-green-400 to-emerald-600",
    mantraIds: ["mahamrityunjaya-mantra", "hanuman-chalisa"],
  },
  {
    id: "marriage",
    label: "Marriage",
    emoji: "💍",
    description: "Harmony and blessings for union.",
    color: "from-pink-400 to-rose-500",
    mantraIds: ["om-namah-shivaya", "shree-ram-jai-ram"],
  },
  {
    id: "protection",
    label: "Protection",
    emoji: "🙏",
    description: "Shield from negativity and fear.",
    color: "from-orange-400 to-red-500",
    mantraIds: ["hanuman-chalisa", "om-dum-durgayei-namaha", "mahamrityunjaya-mantra"],
  },
  {
    id: "meditation",
    label: "Meditation",
    emoji: "🧘",
    description: "Deepen stillness and spiritual focus.",
    color: "from-violet-400 to-purple-500",
    mantraIds: ["om-namah-shivaya", "gayatri-mantra"],
  },
  {
    id: "happiness",
    label: "Happiness",
    emoji: "😊",
    description: "Joy, contentment and a light heart.",
    color: "from-yellow-400 to-amber-500",
    mantraIds: ["hare-krishna-maha-mantra", "shree-ram-jai-ram"],
  },
  {
    id: "success",
    label: "Success",
    emoji: "🌟",
    description: "Achievement and fulfilment of goals.",
    color: "from-amber-400 to-orange-500",
    mantraIds: ["om-gam-ganapataye-namaha", "om-saravana-bhava", "om-dum-durgayei-namaha"],
  },
  {
    id: "gratitude",
    label: "Gratitude",
    emoji: "🌸",
    description: "Thankfulness and divine connection.",
    color: "from-rose-400 to-fuchsia-500",
    mantraIds: ["hare-krishna-maha-mantra", "om-sai-namo-namaha"],
  },
  {
    id: "spiritual-growth",
    label: "Spiritual Growth",
    emoji: "🪷",
    description: "Awakening and inner evolution.",
    color: "from-purple-400 to-indigo-500",
    mantraIds: ["gayatri-mantra", "om-namah-shivaya", "hare-krishna-maha-mantra"],
  },
];

export const INTENTION_DISCLAIMER =
  "Recommendations are based on traditional spiritual practices and are intended for personal devotion. They are not guarantees of outcomes.";

export const getIntentionById = (id: string) =>
  intentions.find((i) => i.id === id);
