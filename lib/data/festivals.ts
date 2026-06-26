import { Festival } from "@/lib/types";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1000/700`;

export const festivals: Festival[] = [
  {
    id: "f1",
    slug: "diwali",
    name: "Diwali",
    date: "October / November",
    story:
      "Diwali, the festival of lights, celebrates the return of Lord Rama to Ayodhya after fourteen years of exile and his victory over Ravana. Rows of lamps lit the path to welcome him home.",
    whyCelebrate:
      "It symbolises the triumph of light over darkness, good over evil, and knowledge over ignorance.",
    pujaVidhi: [
      "Clean and decorate the home with rangoli",
      "Light diyas and candles at dusk",
      "Perform Lakshmi-Ganesh puja",
      "Offer sweets and prayers for prosperity",
    ],
    mantras: ["om-shreem-mahalakshmiyei-namaha", "om-gam-ganapataye-namaha"],
    bhajans: ["Om Jai Lakshmi Mata", "Shubh Deepavali"],
    food: ["Ladoo", "Kaju Katli", "Gujiya", "Chakli"],
    faqs: [
      { q: "How many days is Diwali?", a: "Diwali spans five days, from Dhanteras to Bhai Dooj." },
      { q: "Why do we light diyas?", a: "Diyas symbolise the inner light that protects from spiritual darkness." },
    ],
    image: img("festival-diwali"),
  },
  {
    id: "f2",
    slug: "holi",
    name: "Holi",
    date: "March",
    story:
      "Holi celebrates the divine love of Radha and Krishna and the legend of Prahlad and Holika, where devotion triumphed over the demoness's fire, symbolising the burning away of evil.",
    whyCelebrate:
      "It marks the arrival of spring and the victory of good over evil, spreading joy, colour and unity.",
    pujaVidhi: [
      "Perform Holika Dahan bonfire the night before",
      "Offer prayers around the sacred fire",
      "Play with natural colours and water",
      "Share sweets and forgive past grievances",
    ],
    mantras: ["hare-krishna-maha-mantra"],
    bhajans: ["Rang Barse", "Holi Khele Raghuveera"],
    food: ["Gujiya", "Thandai", "Malpua", "Dahi Bhalla"],
    faqs: [
      { q: "What is Holika Dahan?", a: "A bonfire lit the night before Holi symbolising the burning of evil." },
      { q: "Why is Holi called the festival of colours?", a: "Colours represent joy, love and the vibrancy of spring." },
    ],
    image: img("festival-holi"),
  },
  {
    id: "f3",
    slug: "navratri",
    name: "Navratri",
    date: "September / October",
    story:
      "Navratri honours Goddess Durga's nine forms and her nine-day battle with the demon Mahishasura, culminating in her victory on the tenth day, Vijayadashami.",
    whyCelebrate:
      "It celebrates the victory of divine feminine power (Shakti) over evil and the triumph of dharma.",
    pujaVidhi: [
      "Install the Kalash on day one",
      "Worship a different form of Durga each day",
      "Observe fasting and chant Durga mantras",
      "Perform Garba and Dandiya in the evenings",
    ],
    mantras: ["om-dum-durgayei-namaha"],
    bhajans: ["Jai Ambe Gauri", "Aigiri Nandini"],
    food: ["Sabudana Khichdi", "Kuttu Puri", "Singhare Halwa"],
    faqs: [
      { q: "What are the nine forms of Durga?", a: "The Navadurga: Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri and Siddhidatri." },
      { q: "What is Garba?", a: "A devotional folk dance performed in circles during Navratri." },
    ],
    image: img("festival-navratri"),
  },
  {
    id: "f4",
    slug: "janmashtami",
    name: "Janmashtami",
    date: "August / September",
    story:
      "Janmashtami celebrates the birth of Lord Krishna at midnight in Mathura, who incarnated to rid the world of the tyrant Kamsa and re-establish dharma.",
    whyCelebrate:
      "It honours the descent of the divine to protect the righteous and guide humanity.",
    pujaVidhi: [
      "Fast through the day until midnight",
      "Decorate the cradle of baby Krishna",
      "Perform abhishekam at midnight",
      "Sing bhajans and break the Dahi Handi",
    ],
    mantras: ["hare-krishna-maha-mantra"],
    bhajans: ["Achyutam Keshavam", "Govind Bolo Hari Gopal Bolo"],
    food: ["Makhan Mishri", "Panjiri", "Charnamrit", "Kheer"],
    faqs: [
      { q: "What is Dahi Handi?", a: "A festive event where a pot of curd is hung high and human pyramids break it, re-enacting Krishna's childhood." },
      { q: "Why fast on Janmashtami?", a: "Devotees fast as an act of devotion until Krishna's midnight birth." },
    ],
    image: img("festival-janmashtami"),
  },
  {
    id: "f5",
    slug: "maha-shivaratri",
    name: "Maha Shivaratri",
    date: "February / March",
    story:
      "Maha Shivaratri, the 'Great Night of Shiva', marks the night Shiva performed the cosmic dance and, by some accounts, his marriage to Parvati.",
    whyCelebrate:
      "It is a night of devotion, fasting and meditation to overcome darkness and ignorance.",
    pujaVidhi: [
      "Observe a day-long fast",
      "Bathe the Shiva lingam with milk, water and honey",
      "Offer bilva leaves",
      "Stay awake through the night chanting Om Namah Shivaya",
    ],
    mantras: ["om-namah-shivaya", "mahamrityunjaya-mantra"],
    bhajans: ["Shiv Tandav Stotram", "Bholenath Bhajan"],
    food: ["Thandai", "Sabudana Vada", "Fruits and Milk"],
    faqs: [
      { q: "Why stay awake on Shivaratri?", a: "The night-long vigil symbolises spiritual awakening and overcoming inner darkness." },
      { q: "Why offer bilva leaves?", a: "Bilva (bel) leaves are believed to be especially dear to Lord Shiva." },
    ],
    image: img("festival-shivaratri"),
  },
  {
    id: "f6",
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    date: "August / September",
    story:
      "Ganesh Chaturthi celebrates the birth of Lord Ganesha, the remover of obstacles. Clay idols are installed, worshipped and immersed in water over ten days.",
    whyCelebrate:
      "It invokes wisdom, prosperity and auspicious new beginnings while fostering community spirit.",
    pujaVidhi: [
      "Install the Ganesha idol with Pranapratishtha",
      "Offer modak and durva grass",
      "Perform aarti morning and evening",
      "Immerse the idol (Visarjan) on the final day",
    ],
    mantras: ["om-gam-ganapataye-namaha"],
    bhajans: ["Sukhkarta Dukhharta", "Ganpati Bappa Morya"],
    food: ["Modak", "Puran Poli", "Karanji"],
    faqs: [
      { q: "Why is modak offered?", a: "Modak is believed to be Ganesha's favourite sweet, symbolising the reward of sadhana." },
      { q: "What is Visarjan?", a: "The ritual immersion of the idol, symbolising the cycle of creation and return." },
    ],
    image: img("festival-ganesh"),
  },
  {
    id: "f7",
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    date: "August",
    story:
      "Raksha Bandhan, also called Rakhi, celebrates the sacred bond between brothers and sisters. A sister ties a rakhi on her brother's wrist, praying for his well-being, while he vows to protect her. Legends recall Draupadi tying a cloth on Krishna's wrist and Krishna's promise to protect her.",
    whyCelebrate:
      "It honours the lifelong bond of love, duty and protection between siblings.",
    pujaVidhi: [
      "Prepare a puja thali with rakhi, roli, rice, sweets and a diya",
      "Apply tilak and aarti to the brother",
      "Tie the rakhi on his right wrist with a prayer",
      "Exchange sweets and gifts",
    ],
    mantras: [],
    bhajans: ["Behna Ne Bhai Ki Kalai Se", "Phoolon Ka Taaron Ka"],
    food: ["Ghevar", "Kaju Katli", "Coconut Ladoo", "Rasgulla"],
    faqs: [
      {
        q: "On which wrist is the rakhi tied?",
        a: "The rakhi is traditionally tied on the brother's right wrist.",
      },
      {
        q: "What is the story of Krishna and Draupadi?",
        a: "When Krishna cut his finger, Draupadi tore a piece of her saree to bind the wound; Krishna vowed to protect her in return, exemplifying the spirit of Rakhi.",
      },
    ],
    image: img("festival-rakhi"),
  },
];

export const getFestivalBySlug = (slug: string) =>
  festivals.find((f) => f.slug === slug);
