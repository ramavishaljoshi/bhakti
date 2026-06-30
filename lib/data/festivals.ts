import { Festival } from "@/lib/types";

// Calendar order (Jan → Dec) so festivals appear in the sequence they occur
// through the year. Any festival not listed here falls to the end.
const FESTIVAL_ORDER = [
  "makar-sankranti",
  "vasant-panchami",
  "maha-shivaratri",
  "holi",
  "ram-navami",
  "hanuman-jayanti",
  "baisakhi",
  "guru-purnima",
  "raksha-bandhan",
  "janmashtami",
  "ganesh-chaturthi",
  "navratri",
  "dussehra",
  "karwa-chauth",
  "dhanteras",
  "diwali",
  "govardhan-puja",
  "bhai-dooj",
  "chhath-puja",
  "guru-nanak-jayanti",
  "christmas",
];

const festivalList: Festival[] = [
  {
    id: "f1",
    slug: "diwali",
    name: "Diwali",
    date: "October / November",
    isoDate: "2026-11-08",
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
    image: "/assets/festivals/diwali.jpg",
  },
  {
    id: "f2",
    slug: "holi",
    name: "Holi",
    date: "March",
    isoDate: "2026-03-04",
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
    image: "/assets/festivals/holi.jpg",
  },
  {
    id: "f3",
    slug: "navratri",
    name: "Navratri",
    date: "September / October",
    isoDate: "2026-10-11",
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
    image: "/assets/festivals/navratri.jpg",
  },
  {
    id: "f4",
    slug: "janmashtami",
    name: "Janmashtami",
    date: "August / September",
    isoDate: "2026-09-04",
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
    image: "/assets/festivals/janmashtami.jpg",
  },
  {
    id: "f5",
    slug: "maha-shivaratri",
    name: "Maha Shivaratri",
    date: "February / March",
    isoDate: "2026-02-15",
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
    image: "/assets/festivals/shivaratri.jpg",
  },
  {
    id: "f6",
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    date: "August / September",
    isoDate: "2026-09-14",
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
    image: "/assets/festivals/ganesh.jpg",
  },
  {
    id: "f7",
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    date: "August",
    isoDate: "2026-08-28",
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
    image: "/assets/festivals/rakhi.jpg",
  },
  {
    id: "f8",
    slug: "dussehra",
    name: "Dussehra",
    date: "September / October",
    isoDate: "2026-10-20",
    story:
      "Dussehra, also called Vijayadashami, marks Lord Rama's victory over the demon king Ravana and Goddess Durga's triumph over the buffalo demon Mahishasura. Towering effigies of Ravana, Meghnad and Kumbhakarna are set ablaze to celebrate the defeat of evil.",
    whyCelebrate:
      "It celebrates the victory of good over evil and righteousness (dharma) over arrogance.",
    pujaVidhi: [
      "Worship Lord Rama and Goddess Durga",
      "Perform Shastra Puja (worship of tools and instruments)",
      "Watch or attend Ramlila performances",
      "Witness the burning of Ravana's effigy at dusk",
    ],
    mantras: ["shree-ram-jai-ram", "om-dum-durgayei-namaha"],
    bhajans: ["Shri Ramchandra Kripalu", "Jai Jai Ram Ram"],
    food: ["Jalebi", "Fafda", "Shrikhand", "Ladoo"],
    faqs: [
      {
        q: "What is the difference between Dussehra and Vijayadashami?",
        a: "They are the same festival — Vijayadashami is the Sanskrit name, while Dussehra is the popular North Indian name.",
      },
      {
        q: "Why is Ravana's effigy burnt?",
        a: "Burning the effigy symbolises the destruction of ego, evil and adharma, and the triumph of Lord Rama.",
      },
    ],
    image: "/assets/festivals/dussehra.jpg",
  },
  {
    id: "f9",
    slug: "karwa-chauth",
    name: "Karwa Chauth",
    date: "October / November",
    isoDate: "2026-10-29",
    story:
      "Karwa Chauth is a one-day festival when married women observe a fast from sunrise to moonrise for the long life and well-being of their husbands. The fast is broken only after sighting the moon and viewing the husband through a sieve.",
    whyCelebrate:
      "It celebrates marital love, devotion and the sacred bond between husband and wife.",
    pujaVidhi: [
      "Wake before sunrise and eat sargi prepared by the mother-in-law",
      "Observe a nirjala (waterless) fast through the day",
      "Listen to the Karwa Chauth katha in the evening",
      "Sight the moon, offer arghya, and break the fast",
    ],
    mantras: ["om-namah-shivaya", "om-gam-ganapataye-namaha"],
    bhajans: ["Karwa Chauth Vrat Katha", "Om Jai Shiv Omkara"],
    food: ["Sargi", "Feni", "Mathri", "Dry fruits"],
    faqs: [
      {
        q: "Who observes the Karwa Chauth fast?",
        a: "Traditionally married women observe it for their husbands; today some unmarried women and husbands keep it too.",
      },
      {
        q: "Why is the moon viewed through a sieve?",
        a: "Looking at the moon and then the husband through a sieve is a customary ritual believed to bless the couple's bond.",
      },
    ],
    image: "/assets/festivals/karwa-chauth.jpg",
  },
  {
    id: "f10",
    slug: "dhanteras",
    name: "Dhanteras",
    date: "October / November",
    isoDate: "2026-11-06",
    story:
      "Dhanteras, the first day of Diwali, honours Lord Dhanvantari, the physician of the gods who emerged from the cosmic ocean with the nectar of immortality, and Goddess Lakshmi. Buying gold, silver or new utensils on this day is considered auspicious.",
    whyCelebrate:
      "It invites health, wealth and prosperity into the home at the start of the Diwali festivities.",
    pujaVidhi: [
      "Clean the home and entrance",
      "Buy gold, silver, or new utensils",
      "Light a diya for Yama in the evening",
      "Perform Lakshmi and Dhanvantari puja",
    ],
    mantras: ["om-shreem-mahalakshmiyei-namaha", "mahamrityunjaya-mantra"],
    bhajans: ["Om Jai Lakshmi Mata", "Dhanvantari Stotram"],
    food: ["Ladoo", "Peda", "Dhania Panjiri", "Kheer"],
    faqs: [
      {
        q: "Why do people buy metal on Dhanteras?",
        a: "Buying gold, silver or new utensils is believed to bring good fortune and invite Goddess Lakshmi's blessings.",
      },
      {
        q: "Who is Lord Dhanvantari?",
        a: "Dhanvantari is the divine physician and the god of Ayurveda, worshipped on Dhanteras for health and healing.",
      },
    ],
    image: "/assets/festivals/dhanteras.jpg",
  },
  {
    id: "f11",
    slug: "bhai-dooj",
    name: "Bhai Dooj",
    date: "October / November",
    isoDate: "2026-11-11",
    story:
      "Bhai Dooj, celebrated two days after Diwali, honours the bond between brothers and sisters. Sisters apply a tilak on their brothers' foreheads and pray for their long life, recalling the legend of Yamuna welcoming her brother Yama, the lord of death.",
    whyCelebrate:
      "It celebrates the love, protection and lifelong affection between siblings.",
    pujaVidhi: [
      "Prepare a puja thali with tilak, rice and sweets",
      "Apply tilak on the brother's forehead and perform aarti",
      "Pray for the brother's long life and prosperity",
      "Exchange gifts and share a festive meal",
    ],
    mantras: [],
    bhajans: ["Bhaiya Mere Rakhi Ke Bandhan Ko", "Phoolon Ka Taaron Ka"],
    food: ["Kaju Katli", "Gujiya", "Coconut Ladoo", "Halwa"],
    faqs: [
      {
        q: "How is Bhai Dooj different from Raksha Bandhan?",
        a: "Both celebrate the sibling bond, but on Bhai Dooj the sister applies a tilak (not a rakhi) and it falls just after Diwali.",
      },
      {
        q: "What is the legend behind Bhai Dooj?",
        a: "It recalls Yamuna lovingly receiving her brother Yama, who blessed that brothers honoured on this day would prosper.",
      },
    ],
    image: "/assets/festivals/bhai-dooj.jpg",
  },
  {
    id: "f14",
    slug: "christmas",
    name: "Christmas",
    date: "25 December",
    isoDate: "2026-12-25",
    story:
      "Christmas celebrates the birth of Jesus Christ in Bethlehem. Homes and churches are decorated with lights, stars and nativity scenes, and families gather to share love, joy and goodwill. In India, Christmas is celebrated with great warmth across communities.",
    whyCelebrate:
      "It celebrates the birth of Jesus Christ and his message of love, peace and compassion for all.",
    pujaVidhi: [
      "Decorate the Christmas tree with lights and stars",
      "Set up a nativity scene (crib)",
      "Attend the midnight mass at church",
      "Exchange gifts and share festive meals with family",
    ],
    mantras: [],
    bhajans: ["Silent Night", "Joy to the World", "Jingle Bells"],
    food: ["Plum cake", "Rose cookies", "Kulkuls", "Roast"],
    faqs: [
      {
        q: "Why is Christmas celebrated on 25 December?",
        a: "It is the traditional date observed by Christians worldwide to commemorate the birth of Jesus Christ.",
      },
      {
        q: "What are common Christmas traditions in India?",
        a: "Decorating trees and cribs, attending midnight mass, carol singing, exchanging gifts and sharing plum cake.",
      },
    ],
    image: "/assets/festivals/christmas.jpg",
  },
  {
    id: "f15",
    slug: "makar-sankranti",
    name: "Makar Sankranti",
    date: "14 January",
    isoDate: "2026-01-14",
    story:
      "Makar Sankranti marks the sun's transition into Capricorn (Makara) and the start of longer, warmer days. Celebrated as Pongal in the South, Lohri in Punjab and Uttarayan in Gujarat, it is a harvest festival famous for colourful kite-flying and til-gud sweets.",
    whyCelebrate:
      "It honours the Sun God, the harvest, and the auspicious turn towards longer days (Uttarayan).",
    pujaVidhi: [
      "Take a holy dip in a sacred river at dawn",
      "Offer prayers and arghya to the Sun God (Surya)",
      "Prepare and share til-gud (sesame and jaggery) sweets",
      "Fly kites and give to charity (daan)",
    ],
    mantras: ["gayatri-mantra"],
    bhajans: ["Surya Namaskar Mantra", "Om Suryaya Namaha"],
    food: ["Til Ladoo", "Gud", "Khichdi", "Pongal"],
    faqs: [
      {
        q: "Why is Makar Sankranti celebrated?",
        a: "It marks the Sun's movement into Capricorn and the beginning of the harvest season and Uttarayan.",
      },
      {
        q: "What are its regional names?",
        a: "Pongal (Tamil Nadu), Lohri (Punjab), Uttarayan (Gujarat), Bihu (Assam) and Khichdi (UP).",
      },
    ],
    image: "/assets/festivals/makar-sankranti.jpg",
  },
  {
    id: "f17",
    slug: "vasant-panchami",
    name: "Vasant Panchami",
    date: "January / February",
    isoDate: "2026-01-23",
    story:
      "Vasant Panchami heralds the arrival of spring and is dedicated to Goddess Saraswati, the deity of knowledge, music and arts. Devotees wear yellow, worship Saraswati, and children are often taught their first letters on this auspicious day.",
    whyCelebrate:
      "It celebrates the onset of spring and seeks the blessings of Goddess Saraswati for wisdom and learning.",
    pujaVidhi: [
      "Wear yellow clothes symbolising spring",
      "Place books and instruments before Goddess Saraswati",
      "Perform Saraswati puja with yellow flowers",
      "Begin children's education (Akshar Abhyasam)",
    ],
    mantras: ["saraswati-vandana"],
    bhajans: ["Saraswati Vandana", "Ya Kundendu Tushara"],
    food: ["Kesar Halwa", "Boondi Ladoo", "Yellow rice", "Rajbhog"],
    faqs: [
      {
        q: "Why is yellow worn on Vasant Panchami?",
        a: "Yellow symbolises the vibrancy of spring and the blossoming mustard fields.",
      },
      {
        q: "Which goddess is worshipped?",
        a: "Goddess Saraswati, the deity of knowledge, music, art and wisdom.",
      },
    ],
    image: "/assets/festivals/vasant-panchami.jpg",
  },
  {
    id: "f18",
    slug: "ram-navami",
    name: "Ram Navami",
    date: "March / April",
    isoDate: "2026-03-26",
    story:
      "Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Vishnu, born to King Dasharatha and Queen Kausalya in Ayodhya. Devotees read the Ramayana, sing bhajans and re-enact scenes from Lord Rama's life.",
    whyCelebrate:
      "It honours the birth of Lord Rama, the embodiment of dharma, virtue and ideal conduct.",
    pujaVidhi: [
      "Clean the home and set up Lord Rama's idol",
      "Observe a fast and read the Ramayana",
      "Sing bhajans and perform aarti at noon (Rama's birth time)",
      "Offer prasad and distribute charity",
    ],
    mantras: ["shree-ram-jai-ram", "hanuman-chalisa"],
    bhajans: ["Shri Ramchandra Kripalu", "Raghupati Raghav Raja Ram"],
    food: ["Panakam", "Kosambari", "Sooji Halwa", "Fruits"],
    faqs: [
      {
        q: "Whose birth does Ram Navami celebrate?",
        a: "It celebrates the birth of Lord Rama in Ayodhya, the seventh avatar of Vishnu.",
      },
      {
        q: "At what time is the puja performed?",
        a: "The main puja and aarti are done at midday, the traditional hour of Lord Rama's birth.",
      },
    ],
    image: "/assets/festivals/ram-navami.jpg",
  },
  {
    id: "f19",
    slug: "hanuman-jayanti",
    name: "Hanuman Jayanti",
    date: "April",
    isoDate: "2026-04-02",
    story:
      "Hanuman Jayanti celebrates the birth of Lord Hanuman, the mighty devotee of Lord Rama and symbol of strength, courage and selfless devotion. Devotees throng Hanuman temples, recite the Hanuman Chalisa and offer sindoor and laddoos.",
    whyCelebrate:
      "It honours Lord Hanuman's unwavering devotion, strength and protection of his devotees.",
    pujaVidhi: [
      "Visit a Hanuman temple early in the morning",
      "Recite the Hanuman Chalisa and Sundara Kanda",
      "Offer sindoor, a garland and boondi laddoo",
      "Light a diya and perform aarti",
    ],
    mantras: ["hanuman-chalisa", "shree-ram-jai-ram"],
    bhajans: ["Hanuman Chalisa", "Bajrang Baan", "Aarti Kije Hanuman Lala Ki"],
    food: ["Boondi Ladoo", "Banana", "Jaggery", "Panchamrit"],
    faqs: [
      {
        q: "How is Hanuman Jayanti observed?",
        a: "With temple visits, recitation of the Hanuman Chalisa, offerings of sindoor and laddoo, and aarti.",
      },
      {
        q: "Why is sindoor offered to Hanuman?",
        a: "Legend says Hanuman applied sindoor all over his body for Lord Rama's long life, so devotees offer it with devotion.",
      },
    ],
    image: "/assets/festivals/hanuman-jayanti.jpg",
  },
  {
    id: "f20",
    slug: "baisakhi",
    name: "Baisakhi",
    date: "13 April",
    isoDate: "2026-04-14",
    story:
      "Baisakhi (Vaisakhi) is a spring harvest festival and the Sikh New Year. It commemorates the founding of the Khalsa Panth by Guru Gobind Singh in 1699. Punjab comes alive with bhangra, gidda and vibrant fairs celebrating the bountiful harvest.",
    whyCelebrate:
      "It marks the harvest season and the birth of the Khalsa, symbolising courage and community.",
    pujaVidhi: [
      "Visit the Gurudwara and listen to kirtan",
      "Participate in the Nagar Kirtan procession",
      "Celebrate with bhangra and gidda folk dances",
      "Share langar and festive Punjabi food",
    ],
    mantras: [],
    bhajans: ["Satnam Waheguru", "Deh Shiva Bar Mohe", "Japji Sahib"],
    food: ["Makki di Roti", "Sarson da Saag", "Kada Prasad", "Lassi"],
    faqs: [
      {
        q: "What does Baisakhi commemorate?",
        a: "The spring harvest and the formation of the Khalsa Panth by Guru Gobind Singh in 1699.",
      },
      {
        q: "How is Baisakhi celebrated?",
        a: "With Gurudwara visits, Nagar Kirtan, bhangra and gidda dances, fairs and langar.",
      },
    ],
    image: "/assets/festivals/baisakhi.jpg",
  },
  {
    id: "f21",
    slug: "guru-purnima",
    name: "Guru Purnima",
    date: "July",
    isoDate: "2026-07-29",
    story:
      "Guru Purnima is dedicated to honouring one's spiritual and academic teachers (gurus). It also marks the birth of sage Veda Vyasa, who compiled the Vedas and authored the Mahabharata. Disciples express gratitude to their gurus on this full-moon day.",
    whyCelebrate:
      "It expresses gratitude and reverence to gurus who dispel ignorance and guide us to wisdom.",
    pujaVidhi: [
      "Offer respect and gratitude to your guru",
      "Perform Guru puja and seek blessings",
      "Meditate and study sacred scriptures",
      "Observe a day of devotion and charity",
    ],
    mantras: ["om-namah-shivaya"],
    bhajans: ["Guru Brahma Guru Vishnu", "Guru Vandana"],
    food: ["Kheer", "Halwa", "Sabudana", "Fruits"],
    faqs: [
      {
        q: "Whom do we honour on Guru Purnima?",
        a: "Our spiritual and academic teachers, and especially sage Veda Vyasa.",
      },
      {
        q: "When is Guru Purnima observed?",
        a: "On the full-moon day (purnima) of the Hindu month of Ashadha, usually in July.",
      },
    ],
    image: "/assets/festivals/guru-purnima.jpg",
  },
  {
    id: "f23",
    slug: "govardhan-puja",
    name: "Govardhan Puja",
    date: "October / November",
    isoDate: "2026-11-10",
    story:
      "Govardhan Puja, celebrated the day after Diwali, recalls Lord Krishna lifting the Govardhan hill on his little finger to shelter the people of Vrindavan from torrential rains sent by Indra. Devotees prepare a mountain of food (Annakut) as an offering.",
    whyCelebrate:
      "It celebrates Lord Krishna's protection of his devotees and gratitude towards nature.",
    pujaVidhi: [
      "Make a small Govardhan hill from cow dung or food",
      "Prepare Annakut — a grand offering of many dishes",
      "Perform parikrama (circumambulation) of the hill",
      "Offer prayers to Lord Krishna and the cows",
    ],
    mantras: ["hare-krishna-maha-mantra"],
    bhajans: ["Govardhan Maharaj Ki Jai", "Govinda Bolo Hari Gopal Bolo"],
    food: ["Annakut", "Kadhi", "Mixed vegetables", "Sweets"],
    faqs: [
      {
        q: "What is Annakut?",
        a: "A 'mountain of food' — a vast array of vegetarian dishes offered to Lord Krishna on Govardhan Puja.",
      },
      {
        q: "Why is Govardhan Puja celebrated?",
        a: "To honour Krishna lifting Govardhan hill to protect Vrindavan from Indra's storm.",
      },
    ],
    image: "/assets/festivals/govardhan-puja.jpg",
  },
  {
    id: "f24",
    slug: "chhath-puja",
    name: "Chhath Puja",
    date: "October / November",
    isoDate: "2026-11-15",
    story:
      "Chhath Puja is an ancient festival devoted to the Sun God (Surya) and Chhathi Maiya, observed mainly in Bihar, Jharkhand and eastern UP. Devotees observe rigorous fasts and offer arghya to the setting and rising sun while standing in water.",
    whyCelebrate:
      "It thanks the Sun God for sustaining life and seeks well-being and prosperity for the family.",
    pujaVidhi: [
      "Observe Nahay Khay and Kharna purification rituals",
      "Keep a strict nirjala (waterless) fast",
      "Offer arghya to the setting sun on the riverbank",
      "Offer arghya to the rising sun the next morning",
    ],
    mantras: ["gayatri-mantra"],
    bhajans: ["Kanchhi Ke Daab Nimbua", "Chhathi Maiya Aarti"],
    food: ["Thekua", "Rice kheer", "Seasonal fruits", "Sugarcane"],
    faqs: [
      {
        q: "Who is worshipped during Chhath Puja?",
        a: "The Sun God (Surya) and Chhathi Maiya, for health, prosperity and family well-being.",
      },
      {
        q: "Why do devotees stand in water?",
        a: "Standing in water while offering arghya to the sun is a key purifying ritual of Chhath.",
      },
    ],
    image: "/assets/festivals/chhath-puja.jpg",
  },
  {
    id: "f25",
    slug: "guru-nanak-jayanti",
    name: "Guru Nanak Jayanti",
    date: "November",
    isoDate: "2026-11-24",
    story:
      "Guru Nanak Jayanti, also called Gurpurab, celebrates the birth of Guru Nanak Dev Ji, the founder of Sikhism and the first of the ten Sikh Gurus. Gurudwaras glow with lights, and devotees hold processions, kirtan and langar in his honour.",
    whyCelebrate:
      "It honours Guru Nanak Dev Ji and his teachings of one God, equality, honest living and selfless service.",
    pujaVidhi: [
      "Hold Akhand Path — a 48-hour continuous reading of the Guru Granth Sahib",
      "Join the Nagar Kirtan procession",
      "Sing shabad kirtan in the Gurudwara",
      "Serve and partake in langar (community meal)",
    ],
    mantras: [],
    bhajans: ["Ik Onkar", "Satnam Waheguru", "Mool Mantar"],
    food: ["Kada Prasad", "Langar dal", "Roti", "Kheer"],
    faqs: [
      {
        q: "Who was Guru Nanak Dev Ji?",
        a: "The founder of Sikhism and the first Sikh Guru, who preached one God, equality and honest living.",
      },
      {
        q: "What is Gurpurab?",
        a: "Gurpurab is the term for the celebration of a Sikh Guru's birth anniversary, like Guru Nanak Jayanti.",
      },
    ],
    image: "/assets/festivals/guru-nanak-jayanti.jpg",
  },
];

// Exported in calendar order. Unlisted festivals sort to the end.
const orderIndex = (slug: string) => {
  const i = FESTIVAL_ORDER.indexOf(slug);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
};

export const festivals: Festival[] = [...festivalList].sort(
  (a, b) => orderIndex(a.slug) - orderIndex(b.slug)
);

export const getFestivalBySlug = (slug: string) =>
  festivals.find((f) => f.slug === slug);
