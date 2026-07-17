import { RecitationVerse } from "@/lib/types";

// Goswami Tulsidas's Hanuman Chalisa — two opening dohas, forty chaupais and a
// closing doha, in Awadhi. Kept in its own file so mantras.ts stays readable;
// imported there as `hanumanChalisa.fullText`.
export const hanumanChalisaText: RecitationVerse[] = [
  {
    kind: "doha",
    text: "श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥",
    transliteration:
      "śrīguru carana saroja raja, nija manu mukuru sudhāri\nbaranaũ raghubara bimala jasu, jo dāyaku phala cāri",
    meaning:
      "Cleansing the mirror of my mind with the dust of my Guru's lotus feet, I sing the unblemished glory of Raghuvar — the glory that grants the four fruits of life: dharma, artha, kama and moksha.",
  },
  {
    kind: "doha",
    text: "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥",
    transliteration:
      "buddhihīna tanu jānike, sumirauṁ pavana-kumāra\nbala budhi bidyā dehu mohiṁ, harahu kalesa bikāra",
    meaning:
      "Knowing myself to be without wit, I call upon the son of the Wind. Grant me strength, intelligence and knowledge, and take away my sorrows and failings.",
  },
  {
    kind: "chaupai",
    number: 1,
    text: "जय हनुमान ज्ञान गुन सागर।\nजय कपीस तिहुँ लोक उजागर॥",
    transliteration:
      "jaya hanumāna jñāna guna sāgara\njaya kapīsa tihuṁ loka ujāgara",
    meaning:
      "Victory to Hanuman, ocean of wisdom and virtue. Victory to the lord of the vanaras, who lights up all three worlds.",
  },
  {
    kind: "chaupai",
    number: 2,
    text: "राम दूत अतुलित बल धामा।\nअंजनि-पुत्र पवनसुत नामा॥",
    transliteration:
      "rāma dūta atulita bala dhāmā\naṁjani-putra pavanasuta nāmā",
    meaning:
      "Messenger of Rama, abode of immeasurable strength; known as Anjani's son and the child of the Wind.",
  },
  {
    kind: "chaupai",
    number: 3,
    text: "महाबीर बिक्रम बजरंगी।\nकुमति निवार सुमति के संगी॥",
    transliteration:
      "mahābīra bikrama bajaraṁgī\nkumati nivāra sumati ke saṁgī",
    meaning:
      "Great hero, valiant one, whose limbs are hard as a thunderbolt; you drive away wrong thinking and keep company with good sense.",
  },
  {
    kind: "chaupai",
    number: 4,
    text: "कंचन बरन बिराज सुबेसा।\nकानन कुंडल कुँचित केसा॥",
    transliteration:
      "kaṁcana barana birāja subesā\nkānana kuṁḍala kuṁcita kesā",
    meaning:
      "Golden-hued and splendidly dressed, with rings shining in your ears and curling hair.",
  },
  {
    kind: "chaupai",
    number: 5,
    text: "हाथ बज्र और ध्वजा बिराजै।\nकाँधे मूँज जनेऊ साजै॥",
    transliteration:
      "hātha bajra aura dhvajā birājai\nkāṁdhe mūṁja janeū sājai",
    meaning:
      "The thunderbolt and the banner shine in your hands; a sacred thread of munja grass adorns your shoulder.",
  },
  {
    kind: "chaupai",
    number: 6,
    text: "संकर सुवन केसरी नंदन।\nतेज प्रताप महा जग बंदन॥",
    transliteration:
      "saṁkara suvana kesarī naṁdana\nteja pratāpa mahā jaga baṁdana",
    meaning:
      "Emanation of Shankar, joy of Kesari; your radiance and might are honoured by the whole world.",
  },
  {
    kind: "chaupai",
    number: 7,
    text: "बिद्यावान गुनी अति चातुर।\nराम काज करिबे को आतुर॥",
    transliteration:
      "bidyāvāna gunī ati cātura\nrāma kāja karibe ko ātura",
    meaning:
      "Learned, virtuous and exceedingly clever, always eager to do Rama's work.",
  },
  {
    kind: "chaupai",
    number: 8,
    text: "प्रभु चरित्र सुनिबे को रसिया।\nराम लखन सीता मन बसिया॥",
    transliteration:
      "prabhu caritra sunibe ko rasiyā\nrāma lakhana sītā mana basiyā",
    meaning:
      "You delight in hearing the Lord's deeds; Rama, Lakshman and Sita dwell within your heart.",
  },
  {
    kind: "chaupai",
    number: 9,
    text: "सूक्ष्म रूप धरि सियहिं दिखावा।\nबिकट रूप धरि लंक जरावा॥",
    transliteration:
      "sūkṣma rūpa dhari siyahiṁ dikhāvā\nbikaṭa rūpa dhari laṁka jarāvā",
    meaning:
      "Taking a tiny form you appeared before Sita; taking a terrifying form you burned Lanka.",
  },
  {
    kind: "chaupai",
    number: 10,
    text: "भीम रूप धरि असुर सँहारे।\nरामचंद्र के काज सँवारे॥",
    transliteration:
      "bhīma rūpa dhari asura saṁhāre\nrāmacaṁdra ke kāja saṁvāre",
    meaning:
      "Assuming a mighty form you destroyed the demons and carried out Ramachandra's every task.",
  },
  {
    kind: "chaupai",
    number: 11,
    text: "लाय सजीवन लखन जियाये।\nश्रीरघुबीर हरषि उर लाये॥",
    transliteration:
      "lāya sajīvana lakhana jiyāye\nśrīraghubīra haraṣi ura lāye",
    meaning:
      "You brought the Sanjeevani herb and restored Lakshman to life; Shri Raghuvir joyfully clasped you to his heart.",
  },
  {
    kind: "chaupai",
    number: 12,
    text: "रघुपति कीन्ही बहुत बड़ाई।\nतुम मम प्रिय भरतहि सम भाई॥",
    transliteration:
      "raghupati kīnhī bahuta baṛāī\ntuma mama priya bharatahi sama bhāī",
    meaning:
      "Raghupati praised you greatly, saying — you are as dear to me as my own brother Bharat.",
  },
  {
    kind: "chaupai",
    number: 13,
    text: "सहस बदन तुम्हरो जस गावैं।\nअस कहि श्रीपति कंठ लगावैं॥",
    transliteration:
      "sahasa badana tumharo jasa gāvaiṁ\nasa kahi śrīpati kaṁṭha lagāvaiṁ",
    meaning:
      "\"The thousand-mouthed Sheshnag sings your glory\" — saying this, the Lord of Lakshmi embraced you.",
  },
  {
    kind: "chaupai",
    number: 14,
    text: "सनकादिक ब्रह्मादि मुनीसा।\nनारद सारद सहित अहीसा॥",
    transliteration:
      "sanakādika brahmādi munīsā\nnārada sārada sahita ahīsā",
    meaning:
      "Sanak and his brothers, Brahma and the great sages, Narad, Sharada and Sheshnag —",
  },
  {
    kind: "chaupai",
    number: 15,
    text: "जम कुबेर दिगपाल जहाँ ते।\nकबि कोबिद कहि सके कहाँ ते॥",
    transliteration:
      "jama kubera digapāla jahāṁ te\nkabi kobida kahi sake kahāṁ te",
    meaning:
      "— Yama, Kuber and the guardians of the quarters cannot fully praise you. How then can poets and scholars describe you?",
  },
  {
    kind: "chaupai",
    number: 16,
    text: "तुम उपकार सुग्रीवहिं कीन्हा।\nराम मिलाय राजपद दीन्हा॥",
    transliteration:
      "tuma upakāra sugrīvahiṁ kīnhā\nrāma milāya rājapada dīnhā",
    meaning:
      "You did Sugriva a great kindness — bringing him to Rama, you won him his kingdom.",
  },
  {
    kind: "chaupai",
    number: 17,
    text: "तुम्हरो मंत्र बिभीषन माना।\nलंकेस्वर भए सब जग जाना॥",
    transliteration:
      "tumharo maṁtra bibhīṣana mānā\nlaṁkesvara bhae saba jaga jānā",
    meaning:
      "Vibhishan accepted your counsel and became the lord of Lanka — the whole world knows it.",
  },
  {
    kind: "chaupai",
    number: 18,
    text: "जुग सहस्र जोजन पर भानू।\nलील्यो ताहि मधुर फल जानू॥",
    transliteration:
      "juga sahasra jojana para bhānū\nlīlyo tāhi madhura phala jānū",
    meaning:
      "The sun stands thousands of yojanas away, yet you swallowed it, taking it for a sweet fruit.",
  },
  {
    kind: "chaupai",
    number: 19,
    text: "प्रभु मुद्रिका मेलि मुख माहीं।\nजलधि लाँघि गये अचरज नाहीं॥",
    transliteration:
      "prabhu mudrikā meli mukha māhīṁ\njaladhi lāṁghi gaye acaraja nāhīṁ",
    meaning:
      "Carrying the Lord's ring in your mouth, you leapt across the ocean — in that there is no wonder.",
  },
  {
    kind: "chaupai",
    number: 20,
    text: "दुर्गम काज जगत के जेते।\nसुगम अनुग्रह तुम्हरे तेते॥",
    transliteration:
      "durgama kāja jagata ke jete\nsugama anugraha tumhare tete",
    meaning:
      "However hard the tasks of this world may be, they become easy by your grace.",
  },
  {
    kind: "chaupai",
    number: 21,
    text: "राम दुआरे तुम रखवारे।\nहोत न आज्ञा बिनु पैसारे॥",
    transliteration:
      "rāma duāre tuma rakhavāre\nhota na ājñā binu paisāre",
    meaning:
      "You are the guardian at Rama's door; no one enters without your leave.",
  },
  {
    kind: "chaupai",
    number: 22,
    text: "सब सुख लहै तुम्हारी सरना।\nतुम रक्षक काहू को डर ना॥",
    transliteration:
      "saba sukha lahai tumhārī saranā\ntuma rakṣaka kāhū ko ḍara nā",
    meaning:
      "Every happiness is found in your shelter; with you as protector, there is nothing to fear.",
  },
  {
    kind: "chaupai",
    number: 23,
    text: "आपन तेज सम्हारो आपै।\nतीनों लोक हाँक तें काँपै॥",
    transliteration:
      "āpana teja samhāro āpai\ntīnoṁ loka hāṁka teṁ kāṁpai",
    meaning:
      "Only you can hold your own splendour in check; at your roar the three worlds tremble.",
  },
  {
    kind: "chaupai",
    number: 24,
    text: "भूत पिसाच निकट नहिं आवै।\nमहाबीर जब नाम सुनावै॥",
    transliteration:
      "bhūta pisāca nikaṭa nahiṁ āvai\nmahābīra jaba nāma sunāvai",
    meaning:
      "Ghosts and evil spirits do not come near when the name of Mahavir is spoken aloud.",
  },
  {
    kind: "chaupai",
    number: 25,
    text: "नासै रोग हरै सब पीरा।\nजपत निरंतर हनुमत बीरा॥",
    transliteration:
      "nāsai roga harai saba pīrā\njapata niraṁtara hanumata bīrā",
    meaning:
      "Illness is destroyed and all pain removed by ceaselessly chanting \"Hanumat Vira\".",
  },
  {
    kind: "chaupai",
    number: 26,
    text: "संकट तें हनुमान छुड़ावै।\nमन क्रम बचन ध्यान जो लावै॥",
    transliteration:
      "saṁkaṭa teṁ hanumāna chuṛāvai\nmana krama bacana dhyāna jo lāvai",
    meaning:
      "Hanuman releases from every trouble those who hold him in mind, deed and word.",
  },
  {
    kind: "chaupai",
    number: 27,
    text: "सब पर राम तपस्वी राजा।\nतिन के काज सकल तुम साजा॥",
    transliteration:
      "saba para rāma tapasvī rājā\ntina ke kāja sakala tuma sājā",
    meaning:
      "Rama is the ascetic king above all; and it was you who accomplished all his work.",
  },
  {
    kind: "chaupai",
    number: 28,
    text: "और मनोरथ जो कोई लावै।\nसोइ अमित जीवन फल पावै॥",
    transliteration:
      "aura manoratha jo koī lāvai\nsoi amita jīvana phala pāvai",
    meaning:
      "Whoever brings any other longing to you receives fruit beyond measure in this life.",
  },
  {
    kind: "chaupai",
    number: 29,
    text: "चारों जुग परताप तुम्हारा।\nहै परसिद्ध जगत उजियारा॥",
    transliteration:
      "cāroṁ juga paratāpa tumhārā\nhai parasiddha jagata ujiyārā",
    meaning:
      "Your majesty spans all four ages; your fame is renowned and lights up the world.",
  },
  {
    kind: "chaupai",
    number: 30,
    text: "साधु संत के तुम रखवारे।\nअसुर निकंदन राम दुलारे॥",
    transliteration:
      "sādhu saṁta ke tuma rakhavāre\nasura nikaṁdana rāma dulāre",
    meaning:
      "You are the guardian of the holy and the saintly, uprooter of demons, and Rama's beloved.",
  },
  {
    kind: "chaupai",
    number: 31,
    text: "अष्ट सिद्धि नौ निधि के दाता।\nअस बर दीन जानकी माता॥",
    transliteration:
      "aṣṭa siddhi nau nidhi ke dātā\nasa bara dīna jānakī mātā",
    meaning:
      "You grant the eight siddhis and the nine treasures — such was the boon Mother Janaki gave you.",
  },
  {
    kind: "chaupai",
    number: 32,
    text: "राम रसायन तुम्हरे पासा।\nसदा रहो रघुपति के दासा॥",
    transliteration:
      "rāma rasāyana tumhare pāsā\nsadā raho raghupati ke dāsā",
    meaning:
      "The elixir of Rama's name is yours; may you remain forever the servant of Raghupati.",
  },
  {
    kind: "chaupai",
    number: 33,
    text: "तुम्हरे भजन राम को पावै।\nजनम जनम के दुख बिसरावै॥",
    transliteration:
      "tumhare bhajana rāma ko pāvai\njanama janama ke dukha bisarāvai",
    meaning:
      "Through singing your praise one reaches Rama and forgets the sorrows of birth after birth.",
  },
  {
    kind: "chaupai",
    number: 34,
    text: "अंत काल रघुबर पुर जाई।\nजहाँ जन्म हरि-भक्त कहाई॥",
    transliteration:
      "aṁta kāla raghubara pura jāī\njahāṁ janma hari-bhakta kahāī",
    meaning:
      "At life's end one goes to Rama's abode, and is born there to be known as a devotee of Hari.",
  },
  {
    kind: "chaupai",
    number: 35,
    text: "और देवता चित्त न धरई।\nहनुमत सेइ सर्ब सुख करई॥",
    transliteration:
      "aura devatā citta na dharaī\nhanumata sei sarba sukha karaī",
    meaning:
      "One need keep no other deity in mind; serving Hanuman alone brings every happiness.",
  },
  {
    kind: "chaupai",
    number: 36,
    text: "संकट कटै मिटै सब पीरा।\nजो सुमिरै हनुमत बलबीरा॥",
    transliteration:
      "saṁkaṭa kaṭai miṭai saba pīrā\njo sumirai hanumata balabīrā",
    meaning:
      "Troubles are cut away and all pain erased for whoever remembers the mighty, valiant Hanuman.",
  },
  {
    kind: "chaupai",
    number: 37,
    text: "जय जय जय हनुमान गोसाईं।\nकृपा करहु गुरुदेव की नाईं॥",
    transliteration:
      "jaya jaya jaya hanumāna gosāīṁ\nkṛpā karahu gurudeva kī nāīṁ",
    meaning:
      "Victory, victory, victory to Lord Hanuman! Show me your grace as my Gurudev would.",
  },
  {
    kind: "chaupai",
    number: 38,
    text: "जो सत बार पाठ कर कोई।\nछूटहि बंदि महा सुख होई॥",
    transliteration:
      "jo sata bāra pāṭha kara koī\nchūṭahi baṁdi mahā sukha hoī",
    meaning:
      "Whoever recites this a hundred times is freed from bondage and attains great bliss.",
  },
  {
    kind: "chaupai",
    number: 39,
    text: "जो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा॥",
    transliteration:
      "jo yaha paṛhai hanumāna cālīsā\nhoya siddhi sākhī gaurīsā",
    meaning:
      "Whoever reads this Hanuman Chalisa attains perfection — Gaurisa (Shiva) himself is witness.",
  },
  {
    kind: "chaupai",
    number: 40,
    text: "तुलसीदास सदा हरि चेरा।\nकीजै नाथ हृदय महँ डेरा॥",
    transliteration:
      "tulasīdāsa sadā hari cerā\nkījai nātha hṛdaya mahaṁ ḍerā",
    meaning:
      "Tulsidas is forever Hari's servant; O Lord, make your dwelling within my heart.",
  },
  {
    kind: "doha",
    text: "पवनतनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥",
    transliteration:
      "pavanatanaya saṁkaṭa harana, maṁgala mūrati rūpa\nrāma lakhana sītā sahita, hṛdaya basahu sura bhūpa",
    meaning:
      "O son of the Wind, remover of troubles, form of all auspiciousness — dwell in my heart, O king of gods, together with Rama, Lakshman and Sita.",
  },
];
