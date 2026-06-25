import { Chapter, Verse } from "@/lib/types";

export const gitaChapters: Chapter[] = [
  {
    number: 1,
    name: "Arjuna Vishada Yoga",
    translation: "The Yoga of Arjuna's Dejection",
    versesCount: 47,
    summary:
      "Arjuna, overwhelmed by sorrow and moral confusion on the battlefield of Kurukshetra, lays down his bow, unable to fight against his own kinsmen.",
    verses: [
      {
        chapter: 1,
        verse: 1,
        sanskrit: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः",
        transliteration: "dhṛtarāṣṭra uvāca dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ",
        meaning:
          "Dhritarashtra asked: O Sanjaya, assembled on the holy field of Kurukshetra and eager to fight, what did my sons and the Pandavas do?",
      },
      {
        chapter: 1,
        verse: 28,
        sanskrit: "दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम्",
        transliteration: "dṛṣṭvemaṁ sva-janaṁ kṛṣṇa yuyutsuṁ samupasthitam",
        meaning:
          "Arjuna said: O Krishna, seeing my own kinsmen arrayed for battle, my limbs fail and my mouth grows dry.",
      },
    ],
  },
  {
    number: 2,
    name: "Sankhya Yoga",
    translation: "The Yoga of Knowledge",
    versesCount: 72,
    summary:
      "Krishna begins his teaching, revealing the eternal nature of the soul, the impermanence of the body, and the path of selfless action (Karma Yoga).",
    verses: [
      {
        chapter: 2,
        verse: 13,
        sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा",
        transliteration: "dehino 'smin yathā dehe kaumāraṁ yauvanaṁ jarā",
        meaning:
          "As the embodied soul passes through childhood, youth and old age in this body, so it passes into another body at death. The wise are not deluded by this.",
      },
      {
        chapter: 2,
        verse: 47,
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
        transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana",
        meaning:
          "You have a right to perform your prescribed duty, but never to its fruits. Let not the results be your motive, nor be attached to inaction.",
      },
      {
        chapter: 2,
        verse: 48,
        sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय",
        transliteration: "yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya",
        meaning:
          "Perform your duty established in yoga, O Arjuna, abandoning attachment and remaining even-minded in success and failure. Such equanimity is called yoga.",
      },
    ],
  },
  {
    number: 3,
    name: "Karma Yoga",
    translation: "The Yoga of Action",
    versesCount: 43,
    summary:
      "Krishna explains the importance of performing one's duty selflessly, acting without attachment to results as a path to liberation.",
    verses: [
      {
        chapter: 3,
        verse: 19,
        sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर",
        transliteration: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara",
        meaning:
          "Therefore, without attachment, perform always the work that has to be done, for by working without attachment one attains the Supreme.",
      },
    ],
  },
  {
    number: 4,
    name: "Jnana Karma Sanyasa Yoga",
    translation: "The Yoga of Knowledge & Renunciation of Action",
    versesCount: 42,
    summary:
      "Krishna reveals the divine nature of his incarnations and explains how knowledge and selfless action lead to spiritual freedom.",
    verses: [
      {
        chapter: 4,
        verse: 7,
        sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
        transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata",
        meaning:
          "Whenever there is a decline in righteousness and a rise in unrighteousness, O Arjuna, at that time I manifest myself on earth.",
      },
    ],
  },
  {
    number: 12,
    name: "Bhakti Yoga",
    translation: "The Yoga of Devotion",
    versesCount: 20,
    summary:
      "Krishna describes the path of loving devotion as the most accessible road to the divine, and the qualities dear to him in a devotee.",
    verses: [
      {
        chapter: 12,
        verse: 13,
        sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च",
        transliteration: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca",
        meaning:
          "One who is free from malice towards all beings, friendly and compassionate, free from possessiveness and ego — such a devotee is dear to me.",
      },
    ],
  },
];

export const dailyVerse: Verse = gitaChapters[1].verses[1]; // BG 2.47

export const getChapter = (num: number) =>
  gitaChapters.find((c) => c.number === num);
