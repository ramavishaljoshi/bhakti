import { Mantra } from "@/lib/types";


export const mantras: Mantra[] = [
  {
    id: "m1",
    slug: "om-namah-shivaya",
    name: "Om Namah Shivaya",
    sanskrit: "ॐ नमः शिवाय",
    transliteration: "Om Namaḥ Śivāya",
    deity: "Shiva",
    category: "Shiva",
    meaning:
      "I bow to Shiva, the supreme consciousness within. A salutation to the inner Self and the source of all existence.",
    pronunciation: "Om Nuh-mah Shee-vah-yah",
    benefits: [
      "Calms the mind and reduces anxiety",
      "Believed to dissolve negative karma",
      "Deepens meditation and inner stillness",
    ],
    whenToChant: "Early morning or during meditation, ideally on Mondays.",
    relatedFestival: "Maha Shivaratri",
    relatedTemple: "Kedarnath Temple",
    intentions: ["peace", "meditation", "spiritual-growth", "protection"],
    image: "/assets/shiva-artwork.jpg",
    count: 108,
    aarti: {
      title: "Om Jai Shiv Omkara",
      audio:
        "https://archive.org/download/saibabaeveningaartiaudiosong_202002/Om%20Jai%20Shiv%20Omkara%20Aarti%20Audio%20Song.mp3",
    },
  },
  {
    id: "m2",
    slug: "hare-krishna-maha-mantra",
    name: "Hare Krishna Maha Mantra",
    sanskrit: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
    transliteration: "Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare",
    deity: "Krishna",
    category: "Krishna",
    meaning:
      "A call to the divine energy of the Lord, awakening love and devotion in the heart through the holy names.",
    pronunciation: "Hah-ray Krish-na Hah-ray Krish-na",
    benefits: [
      "Cultivates joy and devotion",
      "Said to purify the heart",
      "Brings a sense of divine connection",
    ],
    whenToChant: "Anytime, especially during sunrise and sunset.",
    relatedFestival: "Janmashtami",
    relatedTemple: "Banke Bihari Temple",
    intentions: ["happiness", "spiritual-growth", "gratitude", "peace"],
    image: "/assets/mantras/hare-krishna-maha-mantra.jpg",
    count: 108,
    aarti: {
      title: "Aarti Kunj Bihari Ki",
      audio:
        "https://archive.org/download/saibabaeveningaartiaudiosong_202002/Aarti%20Kunjbihari%20Ki%20With%20Lyrics%20By%20Anuradha%20Paudwal.mp3",
    },
  },
  {
    id: "m3",
    slug: "hanuman-chalisa",
    name: "Hanuman Chalisa",
    sanskrit: "श्री हनुमान चालीसा",
    transliteration: "Śrī Hanumān Cālīsā",
    deity: "Hanuman",
    category: "Hanuman",
    meaning:
      "A devotional hymn of forty verses praising Lord Hanuman, the symbol of strength, courage and unwavering devotion.",
    pronunciation: "Shree Hah-noo-maan Chaa-lee-saa",
    benefits: [
      "Believed to grant courage and strength",
      "Said to remove fear and obstacles",
      "Brings protection from negativity",
    ],
    whenToChant: "Tuesday and Saturday mornings.",
    relatedFestival: "Hanuman Jayanti",
    relatedTemple: "Salasar Balaji",
    intentions: ["protection", "career", "success", "health"],
    image: "/assets/mantras/hanuman-chalisa.jpg",
    pdf: "/assets/mantras/hanuman-chalisa.pdf",
    count: 11,
    aarti: {
      title: "Hanuman Chalisa",
      audio:
        "https://archive.org/download/shree-hanuman-chalisa-original-video-gulshan-kumar-hariharan-full-hd_202503/%E0%A4%B6%E0%A4%B0%20%E0%A4%B9%E0%A4%A8%E0%A4%AE%E0%A4%A8%20%E0%A4%9A%E0%A4%B2%E0%A4%B8%20%20Shree%20Hanuman%20Chalisa%20Original%20Video%20%20GULSHAN%20KUMAR%20%20HARIHARAN%20Full%20HD.mp3",
    },
  },
  {
    id: "m4",
    slug: "gayatri-mantra",
    name: "Gayatri Mantra",
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं",
    transliteration: "Om Bhūr Bhuvaḥ Svaḥ Tat Savitur Vareṇyaṃ",
    deity: "Gayatri",
    category: "Gayatri",
    meaning:
      "A prayer to the divine light of the sun to illuminate our intellect and guide us towards truth and wisdom.",
    pronunciation: "Om Bhoor Bhu-vah Swah-ha",
    benefits: [
      "Sharpens intellect and focus",
      "Believed to bring clarity and wisdom",
      "Radiates positive energy",
    ],
    whenToChant: "At dawn (Brahma Muhurta) facing the rising sun.",
    intentions: ["education", "meditation", "spiritual-growth", "success"],
    image: "/assets/mantras/gayatri-mantra.jpg",
    pdf: "/assets/mantras/gayatri-mantra.pdf",
    count: 108,
    aarti: {
      title: "Gayatri Mantra",
      audio:
        "https://archive.org/download/famous-powerful-gayatri-mantra-108-times-om-bhur-bhuva-swaha/Famous%20Powerful%20Gayatri%20Mantra%20108%20Times%20_%20Om%20Bhur%20Bhuva%20Swaha%20_%20%E0%A4%97%E0%A4%BE%E0%A4%AF%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%AE%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%20%20_%20%E0%A4%93%E0%A4%AE%20%E0%A4%AD%E0%A5%82%E0%A4%B0%20%E0%A4%AD%E0%A5%81%E0%A4%B5%E0%A4%BE%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%B9%E0%A4%BE.mp3",
    },
  },
  {
    id: "m5",
    slug: "om-gam-ganapataye-namaha",
    name: "Om Gam Ganapataye Namaha",
    sanskrit: "ॐ गं गणपतये नमः",
    transliteration: "Om Gaṃ Gaṇapataye Namaḥ",
    deity: "Ganesh",
    category: "Ganesh",
    meaning:
      "A salutation to Lord Ganesha, the remover of obstacles and the lord of beginnings and wisdom.",
    pronunciation: "Om Gum Guh-nuh-puh-tuh-yay Nuh-mah-ha",
    benefits: [
      "Believed to remove obstacles",
      "Invokes auspicious new beginnings",
      "Brings success to endeavours",
    ],
    whenToChant: "Before starting any new venture or on Wednesdays.",
    relatedFestival: "Ganesh Chaturthi",
    relatedTemple: "Siddhivinayak Temple",
    intentions: ["success", "career", "education", "protection"],
    image: "/assets/mantras/om-gam-ganapataye-namaha.jpg",
    count: 108,
    aarti: {
      title: "Jai Ganesh Deva",
      audio:
        "https://archive.org/download/saibabaeveningaartiaudiosong_202002/Ganpati%20Aarti%20Audio%20Song.mp3",
    },
  },
  {
    id: "m6",
    slug: "om-dum-durgayei-namaha",
    name: "Om Dum Durgayei Namaha",
    sanskrit: "ॐ दुं दुर्गायै नमः",
    transliteration: "Om Duṃ Durgāyai Namaḥ",
    deity: "Durga",
    category: "Durga",
    meaning:
      "An invocation to Goddess Durga, the divine mother who protects her devotees and destroys negativity.",
    pronunciation: "Om Doom Door-gaa-yei Nuh-mah-ha",
    benefits: [
      "Believed to grant protection",
      "Builds inner strength and courage",
      "Said to overcome difficulties",
    ],
    whenToChant: "During Navratri or on Fridays.",
    relatedFestival: "Navratri",
    intentions: ["protection", "success", "health", "career"],
    image: "/assets/mantras/om-dum-durgayei-namaha.jpg",
    count: 108,
    aarti: {
      title: "Jai Ambe Gauri",
      audio:
        "https://archive.org/download/saibabaeveningaartiaudiosong_202002/Ambe%20Ji%20Ki%20Aarti.mp3",
    },
  },
  {
    id: "m7",
    slug: "om-shreem-mahalakshmiyei-namaha",
    name: "Om Shreem Mahalakshmiyei Namaha",
    sanskrit: "ॐ श्रीं महालक्ष्म्यै नमः",
    transliteration: "Om Śrīṃ Mahālakṣmyai Namaḥ",
    deity: "Lakshmi",
    category: "Lakshmi",
    meaning:
      "A prayer to Goddess Lakshmi for abundance, prosperity and the grace of material and spiritual wealth.",
    pronunciation: "Om Shreem Muh-haa-luk-shmee-yei Nuh-mah-ha",
    benefits: [
      "Believed to attract prosperity",
      "Invokes abundance and grace",
      "Brings harmony to the home",
    ],
    whenToChant: "On Fridays and during Diwali.",
    relatedFestival: "Diwali",
    intentions: ["prosperity", "career", "success", "gratitude"],
    image: "/assets/mantras/om-shreem-mahalakshmiyei-namaha.jpg",
    count: 108,
    aarti: {
      title: "Om Jai Lakshmi Mata",
      audio:
        "https://archive.org/download/saibabaeveningaartiaudiosong_202002/Aarti%20Lakshmi%20Ji%20Ki.mp3",
    },
  },
  {
    id: "m8",
    slug: "saraswati-vandana",
    name: "Saraswati Vandana",
    sanskrit: "या कुन्देन्दुतुषारहारधवला",
    transliteration: "Yā Kundendu Tuṣārahāra Dhavalā",
    deity: "Saraswati",
    category: "Saraswati",
    meaning:
      "A prayer to Goddess Saraswati, the deity of knowledge, music, art and wisdom, for enlightenment of the mind.",
    pronunciation: "Yaa Koon-den-doo Too-shaa-ra-haa-ra",
    benefits: [
      "Believed to enhance learning and memory",
      "Inspires creativity and arts",
      "Brings clarity of thought",
    ],
    whenToChant: "Before study or during Vasant Panchami.",
    relatedFestival: "Vasant Panchami",
    intentions: ["education", "success", "spiritual-growth"],
    image: "/assets/mantras/saraswati-vandana.jpg",
    count: 108,
    aarti: {
      title: "Om Jai Saraswati Mata",
      audio:
        "https://archive.org/download/saibabaeveningaartiaudiosong_202002/Aarti-Om-Jai-Saraswati-Mata-Alka-Yagnik-Mp3-Lyrics-Song.mp3",
    },
  },
  {
    id: "m9",
    slug: "shree-ram-jai-ram",
    name: "Shree Ram Jai Ram",
    sanskrit: "श्री राम जय राम जय जय राम",
    transliteration: "Śrī Rāma Jaya Rāma Jaya Jaya Rāma",
    deity: "Ram",
    category: "Ram",
    meaning:
      "A jubilant chant glorifying Lord Rama, the embodiment of righteousness, virtue and dharma.",
    pronunciation: "Shree Raam Jai Raam Jai Jai Raam",
    benefits: [
      "Brings peace and contentment",
      "Said to instill righteousness",
      "Calms a restless mind",
    ],
    whenToChant: "Anytime, especially during Ram Navami.",
    relatedFestival: "Ram Navami",
    relatedTemple: "Ram Mandir Ayodhya",
    intentions: ["peace", "spiritual-growth", "happiness", "protection"],
    image: "/assets/mantras/shree-ram-jai-ram.jpg",
    count: 108,
    aarti: {
      title: "Aarti Shri Ramayan Ji Ki",
      audio:
        "https://archive.org/download/saibabaeveningaartiaudiosong_202002/Aarti%20Shri%20Ramayan%20Ji%20Ki%20With%20Lyrics%20By%20Anuradha%20Paudwal.mp3",
    },
  },
  {
    id: "m10",
    slug: "om-sai-namo-namaha",
    name: "Om Sai Namo Namaha",
    sanskrit: "ॐ साईं नमो नमः",
    transliteration: "Om Sāī Namo Namaḥ",
    deity: "Sai Baba",
    category: "Sai Baba",
    meaning:
      "A loving salutation to Shirdi Sai Baba, the saint who taught faith (Shraddha) and patience (Saburi).",
    pronunciation: "Om Saa-ee Nuh-mo Nuh-mah-ha",
    benefits: [
      "Cultivates faith and patience",
      "Brings inner peace",
      "Believed to fulfil sincere wishes",
    ],
    whenToChant: "On Thursdays.",
    intentions: ["peace", "health", "gratitude", "protection"],
    image: "/assets/mantras/om-sai-namo-namaha.jpg",
    count: 108,
    aarti: {
      title: "Sai Ram Sai Shyam Sai Bhagwan",
      audio:
        "https://archive.org/download/BhakthiSongs/Om%20sairam%20om%20shyam%20sai%20bhagwan.mp3",
    },
  },
  {
    id: "m11",
    slug: "om-saravana-bhava",
    name: "Om Saravana Bhava",
    sanskrit: "ॐ शरवण भव",
    transliteration: "Om Śaravaṇa Bhava",
    deity: "Murugan",
    category: "Murugan",
    meaning:
      "A powerful invocation to Lord Murugan (Kartikeya), the warrior god of valour and victory.",
    pronunciation: "Om Shuh-ruh-vuh-nuh Bhuh-vuh",
    benefits: [
      "Believed to grant courage and victory",
      "Removes fear and doubt",
      "Brings spiritual energy",
    ],
    whenToChant: "On Fridays and during Thaipusam.",
    relatedTemple: "Palani Murugan Temple",
    intentions: ["success", "protection", "career", "spiritual-growth"],
    image: "/assets/mantras/om-saravana-bhava.jpg",
    count: 108,
    aarti: {
      title: "Om Saravana Bhavaya Namaha",
      audio:
        "/assets/mantras/Trisha_Parui_-_Lord_Murugan_Mantra_Om_Saravana_Bhava_108_Times_%28mp3.pm%29.mp3",
    },
  },
  {
    id: "m12",
    slug: "mahamrityunjaya-mantra",
    name: "Mahamrityunjaya Mantra",
    sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
    transliteration: "Om Tryambakaṃ Yajāmahe Sugandhiṃ Puṣṭivardhanam",
    deity: "Shiva",
    category: "Shiva",
    meaning:
      "The great death-conquering mantra to Lord Shiva, invoking healing, longevity and liberation from fear.",
    pronunciation: "Om Tryum-buh-kum Yuh-jaa-muh-hay",
    benefits: [
      "Believed to promote healing and health",
      "Removes fear of death",
      "Bestows vitality and protection",
    ],
    whenToChant: "During illness or for wellbeing, on Mondays.",
    relatedFestival: "Maha Shivaratri",
    intentions: ["health", "protection", "peace", "spiritual-growth"],
    image: "/assets/mantras/mahamrityunjaya-mantra.jpg",
    pdf: "/assets/mantras/mahamrityunjaya-mantra.pdf",
    count: 108,
    aarti: {
      title: "Mahamrityunjaya Mantra",
      audio:
        "/assets/mantras/Sacred_Sound_Choir_-_Mahamrityunjaya_Mantra_%28mp3.pm%29.mp3",
    },
  },
];

export const mantraCategories = [
  "Shiva",
  "Krishna",
  "Hanuman",
  "Durga",
  "Lakshmi",
  "Saraswati",
  "Ram",
  "Ganesh",
  "Sai Baba",
  "Murugan",
  "Gayatri",
];

export const getMantraBySlug = (slug: string) =>
  mantras.find((m) => m.slug === slug);

export const getMantrasByCategory = (category: string) =>
  mantras.filter((m) => m.category === category);

export const getMantrasByIntention = (intentionId: string) =>
  mantras.filter((m) => m.intentions.includes(intentionId));
