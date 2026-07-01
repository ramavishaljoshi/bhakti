import { God } from "@/lib/types";

export const gods: God[] = [
  {
    id: "g1",
    slug: "shiva",
    name: "Lord Shiva",
    title: "The Destroyer & Transformer",
    introduction:
      "Shiva is one of the principal deities of Hinduism, revered as the destroyer and transformer within the Trimurti. He embodies the cosmic balance of creation and dissolution.",
    story:
      "Seated in eternal meditation on Mount Kailash, Shiva represents the supreme consciousness. Legends tell of him drinking the poison Halahala to save the universe, earning the name Neelkanth. His cosmic dance, the Tandava, symbolises the rhythm of creation and destruction.",
    symbols: ["Trishul (Trident)", "Damaru (Drum)", "Crescent Moon", "Serpent", "Third Eye"],
    festivals: ["Maha Shivaratri", "Shravan Month"],
    temples: ["Kedarnath Temple", "Somnath Temple"],
    mantras: ["om-namah-shivaya", "mahamrityunjaya-mantra"],
    faqs: [
      { q: "Why is Shiva called Neelkanth?", a: "Because he held the poison Halahala in his throat, turning it blue, to protect the universe." },
      { q: "What does the third eye represent?", a: "It symbolises higher awareness, wisdom and the power to see beyond the material world." },
    ],
    color: "from-blue-500 to-indigo-600",
    image: "/assets/shiva-artwork.jpg",
  },
  {
    id: "g2",
    slug: "krishna",
    name: "Lord Krishna",
    title: "The Divine Cowherd",
    introduction:
      "Krishna is the eighth avatar of Vishnu, adored as the god of love, compassion, and divine play (leela). His teachings in the Bhagavad Gita guide millions.",
    story:
      "Born in Mathura to save the world from the tyrant Kamsa, Krishna's childhood in Vrindavan is filled with enchanting tales — lifting Govardhan hill, dancing the Raas Leela, and playing his flute. On the battlefield of Kurukshetra, he revealed the eternal wisdom of the Gita to Arjuna.",
    symbols: ["Flute", "Peacock Feather", "Sudarshan Chakra", "Butter Pot"],
    festivals: ["Janmashtami", "Holi"],
    temples: ["Banke Bihari Temple", "Jagannath Temple"],
    mantras: ["hare-krishna-maha-mantra"],
    faqs: [
      { q: "What is the Bhagavad Gita?", a: "A 700-verse scripture where Krishna imparts spiritual and philosophical guidance to Arjuna." },
      { q: "Why does Krishna play the flute?", a: "The flute symbolises the divine call that draws the soul towards God." },
    ],
    color: "from-sky-500 to-blue-600",
    image: "/assets/mantras/hare-krishna-maha-mantra.jpg",
  },
  {
    id: "g3",
    slug: "hanuman",
    name: "Lord Hanuman",
    title: "The Mighty Devotee",
    introduction:
      "Hanuman is the divine vanara (monkey) devotee of Lord Rama, celebrated for his unmatched strength, devotion, and selfless service.",
    story:
      "Son of the wind god Vayu, Hanuman leapt across the ocean to Lanka in search of Sita, carried a mountain of healing herbs, and burned the city of Lanka with his flaming tail. His devotion to Rama is the ideal of bhakti.",
    symbols: ["Gada (Mace)", "Mountain", "Saffron Body", "Rama's Image in Heart"],
    festivals: ["Hanuman Jayanti"],
    temples: ["Salasar Balaji", "Sankat Mochan Temple"],
    mantras: ["hanuman-chalisa"],
    faqs: [
      { q: "Why is Hanuman worshipped on Tuesdays?", a: "Tuesday is traditionally associated with strength and protection, qualities Hanuman embodies." },
      { q: "What does Hanuman symbolise?", a: "Strength, courage, humility and unwavering devotion." },
    ],
    color: "from-orange-500 to-red-600",
    image: "/assets/mantras/hanuman-chalisa.jpg",
  },
  {
    id: "g4",
    slug: "durga",
    name: "Goddess Durga",
    title: "The Divine Mother",
    introduction:
      "Durga is the warrior goddess who embodies Shakti — the divine feminine energy that protects the cosmos and vanquishes evil.",
    story:
      "Created by the combined energies of the gods, Durga rode a lion to battle the buffalo demon Mahishasura, who could not be defeated by any man or god. After a fierce battle, she restored cosmic order, celebrated each year during Navratri.",
    symbols: ["Lion", "Trishul", "Lotus", "Conch", "Many Arms"],
    festivals: ["Navratri", "Durga Puja"],
    temples: ["Vaishno Devi", "Kamakhya Temple"],
    mantras: ["om-dum-durgayei-namaha"],
    faqs: [
      { q: "Why does Durga have many arms?", a: "Each arm holds a weapon gifted by the gods, symbolising her power to protect from all directions." },
      { q: "What is Navratri?", a: "A nine-night festival honouring the nine forms of Goddess Durga." },
    ],
    color: "from-rose-500 to-pink-600",
    image: "/assets/mantras/om-dum-durgayei-namaha.jpg",
  },
  {
    id: "g5",
    slug: "lakshmi",
    name: "Goddess Lakshmi",
    title: "Goddess of Wealth & Fortune",
    introduction:
      "Lakshmi is the goddess of wealth, prosperity, fortune and beauty — both material and spiritual abundance flow from her grace.",
    story:
      "Lakshmi emerged from the cosmic ocean during the Samudra Manthan, seated on a lotus. As the consort of Vishnu, she accompanies him in every avatar. She is worshipped especially during Diwali for prosperity and wellbeing.",
    symbols: ["Lotus", "Gold Coins", "Owl", "Elephants", "Pot of Abundance"],
    festivals: ["Diwali", "Varalakshmi Vratam"],
    temples: ["Mahalakshmi Temple Mumbai", "Padmanabhaswamy Temple"],
    mantras: ["om-shreem-mahalakshmiyei-namaha"],
    faqs: [
      { q: "Why is Lakshmi worshipped on Diwali?", a: "Diwali night is believed to be when Lakshmi visits homes that are clean and welcoming, bringing prosperity." },
      { q: "What does the lotus symbolise?", a: "Purity and spiritual power rising untouched above the muddy waters of materialism." },
    ],
    color: "from-amber-400 to-yellow-600",
    image: "/assets/mantras/om-shreem-mahalakshmiyei-namaha.jpg",
  },
  {
    id: "g6",
    slug: "ganesh",
    name: "Lord Ganesh",
    title: "Remover of Obstacles",
    introduction:
      "Ganesha, the elephant-headed god, is the lord of beginnings, wisdom and the remover of obstacles. He is invoked before any new venture.",
    story:
      "Created by Goddess Parvati, Ganesha guarded her door and was beheaded by Shiva in a misunderstanding. To restore him, Shiva gave him the head of an elephant and named him leader of the ganas, blessing him to be worshipped first among all gods.",
    symbols: ["Elephant Head", "Modak", "Mouse Vahana", "Broken Tusk", "Axe"],
    festivals: ["Ganesh Chaturthi"],
    temples: ["Siddhivinayak Temple", "Ashtavinayak Temples"],
    mantras: ["om-gam-ganapataye-namaha"],
    faqs: [
      { q: "Why is Ganesha worshipped first?", a: "As the remover of obstacles, invoking him first ensures a smooth and auspicious beginning." },
      { q: "What does the broken tusk mean?", a: "It represents sacrifice — he broke it to write the Mahabharata, symbolising wisdom over vanity." },
    ],
    color: "from-orange-400 to-amber-600",
    image: "/assets/mantras/om-gam-ganapataye-namaha.jpg",
  },
];

export const getGodBySlug = (slug: string) => gods.find((g) => g.slug === slug);

// Resolve a deity reference (e.g. mantra.deity "Shiva", temple.deity "Krishna")
// to a god entity. Matches the slug or the display name. Returns undefined when
// there is no dedicated god page (e.g. "Gayatri", "Sai Baba").
export const getGodByName = (name: string) => {
  const n = name.trim().toLowerCase();
  return gods.find(
    (g) => g.slug === n || g.name.toLowerCase().includes(n)
  );
};

// Gods that are associated with a given festival or temple name.
export const getGodsByFestival = (festivalName: string) =>
  gods.filter((g) =>
    g.festivals.some((f) => f.toLowerCase() === festivalName.toLowerCase())
  );

export const getGodsByTemple = (templeName: string) =>
  gods.filter((g) =>
    g.temples.some((t) => t.toLowerCase() === templeName.toLowerCase())
  );
