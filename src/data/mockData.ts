export const RECITERS = [
  { 
    id: "mishary", 
    name: "Mishary Rashid Alafasy", 
    country: "Kuwait", 
    style: "Emotional & Melodic",
    demoAudio: "https://server8.mp3quran.net/afs/001001.mp3"
  },
  { 
    id: "sudais", 
    name: "Abdur-Rahman as-Sudais", 
    country: "Saudi Arabia", 
    style: "Energetic & Fast",
    demoAudio: "https://server11.mp3quran.net/sds/001001.mp3" 
  },
  { 
    id: "minshawi", 
    name: "Mohamed Siddiq El-Minshawi", 
    country: "Egypt", 
    style: "Tajweed Masterpiece",
    demoAudio: "https://server10.mp3quran.net/minsh/001001.mp3"
  },
  { 
    id: "husary", 
    name: "Mahmoud Khalil Al-Husary", 
    country: "Egypt", 
    style: "Perfect Tajweed (Teacher)",
    demoAudio: "https://server13.mp3quran.net/husr/001001.mp3"
  },
  { 
    id: "hudhaify", 
    name: "Ali Al-Hudhaify", 
    country: "Saudi Arabia", 
    style: "Calm & Clear",
    demoAudio: "https://server9.mp3quran.net/hthfi/001001.mp3"
  },
  { 
    id: "afif", 
    name: "Abdullah Al-Afif", 
    country: "Saudi Arabia", 
    style: "Soothing",
    demoAudio: "https://server6.mp3quran.net/afif/001001.mp3"
  },
];

export const SURAHS = [
  { id: 1, name: "Al-Fatiha", nameBn: "আল-ফাতিহা", englishName: "The Opener", verses: 7, revelation: "Meccan" },
  { id: 2, name: "Al-Baqarah", nameBn: "আল-বাকারা", englishName: "The Cow", verses: 286, revelation: "Medinan" },
  { id: 3, name: "Ali 'Imran", nameBn: "আলে-ইমরান", englishName: "Family of Imran", verses: 200, revelation: "Medinan" },
  { id: 4, name: "An-Nisa", nameBn: "আন-নিসা", englishName: "The Women", verses: 176, revelation: "Medinan" },
  { id: 18, name: "Al-Kahf", nameBn: "আল-কাহফ", englishName: "The Cave", verses: 110, revelation: "Meccan" },
  { id: 36, name: "Ya-Sin", nameBn: "ইয়াসীন", englishName: "Ya-Sin", verses: 83, revelation: "Meccan" },
  { id: 55, name: "Ar-Rahman", nameBn: "আর-রহমান", englishName: "The Beneficent", verses: 78, revelation: "Medinan" },
  { id: 67, name: "Al-Mulk", nameBn: "আল-মুলক", englishName: "The Sovereignty", verses: 30, revelation: "Meccan" },
];

export const EMOTIONS = [
  { id: "sad", label: "Sad", labelBn: "দুঃখিত", color: "bg-blue-100 text-blue-700", icon: "🌧️" },
  { id: "anxious", label: "Anxious", labelBn: "উদ্বিগ্ন", color: "bg-orange-100 text-orange-700", icon: "😰" },
  { id: "happy", label: "Grateful", labelBn: "কৃতজ্ঞ", color: "bg-yellow-100 text-yellow-700", icon: "✨" },
  { id: "lost", label: "Lost", labelBn: "দিশেহারা", color: "bg-gray-100 text-gray-700", icon: "🌫️" },
  { id: "angry", label: "Angry", labelBn: "রাগান্বিত", color: "bg-red-100 text-red-700", icon: "🔥" },
  { id: "fear", label: "Fearful", labelBn: "ভীত", color: "bg-purple-100 text-purple-700", icon: "🌑" },
];

export const EMOTION_VERSES: Record<string, Array<{
  arabic: string;
  translation: string;
  translationBn: string;
  reference: string;
  surahId: number;
}>> = {
  sad: [
    {
      arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      translation: "Allah does not burden a soul beyond that it can bear...",
      translationBn: "আল্লাহ কাউকে তার সাধ্যের বাইরে কোনো বোঝা চাপিয়ে দেন না...",
      reference: "Surah Al-Baqarah, 2:286",
      surahId: 2
    },
    {
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "So verily, with the hardship, there is relief.",
      translationBn: "নিশ্চয়ই কষ্টের সাথে স্বস্তি রয়েছে।",
      reference: "Surah Ash-Sharh, 94:5",
      surahId: 94
    }
  ],
  anxious: [
    {
      arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      translation: "Unquestionably, by the remembrance of Allah hearts are assured.",
      translationBn: "জেনে রাখো, আল্লাহর জিকিরেই চিত্ত প্রশান্ত হয়।",
      reference: "Surah Ar-Ra'd, 13:28",
      surahId: 13
    }
  ],
  happy: [
    {
      arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      translation: "If you are grateful, I will surely increase you [in favor].",
      translationBn: "যদি তোমরা কৃতজ্ঞতা স্বীকার করো, তবে আমি অবশ্যই তোমাদের (নেয়ামত) বাড়িয়ে দেব।",
      reference: "Surah Ibrahim, 14:7",
      surahId: 14
    }
  ],
  lost: [
    {
      arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ",
      translation: "And He found you lost and guided [you].",
      translationBn: "এবং তিনি আপনাকে পথহারা পেয়েছেন, অতঃপর পথপ্রদর্শন করেছেন।",
      reference: "Surah Ad-Duhaa, 93:7",
      surahId: 93
    }
  ],
  angry: [
    {
      arabic: "وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ",
      translation: "...and who restrain anger and who pardon the people.",
      translationBn: "...এবং যারা রাগ দমন করে ও মানুষকে ক্ষমা করে।",
      reference: "Surah Ali 'Imran, 3:134",
      surahId: 3
    }
  ],
  fear: [
    {
      arabic: "لَا تَخَفْ وَلَا تَحْزَنْ ۖ إِنَّا مُنَجُّوكَ",
      translation: "Do not fear and do not grieve. Indeed, We will save you.",
      translationBn: "ভয় করো না এবং দুঃখ করো না। নিশ্চয়ই আমি তোমাকে রক্ষা করব।",
      reference: "Surah Al-Ankabut, 29:33",
      surahId: 29
    }
  ]
};

export const DAILY_HADITHS = [
  {
    id: 1,
    source: "Sahih Bukhari",
    text: "The best among you (Muslims) are those who learn the Qur'an and teach it.",
    textBn: "তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি যে কুরআন শেখে এবং অন্যকে শেখায়।"
  },
  {
    id: 2,
    source: "Sahih Muslim",
    text: "Be kind, for whenever kindness becomes part of something, it beautifies it.",
    textBn: "নম্র হও, কেননা যখন কোনো কিছুতে নম্রতা থাকে, তা তাকে সুন্দর করে তোলে।"
  }
];

export const DUAS = [
  {
    id: 1,
    category: "Morning & Evening",
    categoryBn: "সকাল ও সন্ধ্যা",
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa biHamdihi",
    translation: "Glory is to Allah and all praise is to Him.",
    translationBn: "আল্লাহর পবিত্রতা ঘোষণা করছি এবং তাঁরই প্রশংসা করছি।",
    reference: "Bukhari"
  },
  {
    id: 2,
    category: "Forgiveness",
    categoryBn: "ক্ষমা প্রার্থনা",
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha wa atubu ilayhi",
    translation: "I seek forgiveness from Allah and repent to Him.",
    translationBn: "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি এবং তাঁর দিকেই ফিরে আসছি।",
    reference: "Muslim"
  },
  {
    id: 3,
    category: "Protection",
    categoryBn: "নিরাপত্তা",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i",
    translation: "In the name of Allah, with whose name nothing on earth or in the heaven can cause harm.",
    translationBn: "আল্লাহর নামে, যার নামের বরকতে আসমান ও জমিনের কোনো কিছুই ক্ষতি করতে পারে না।",
    reference: "Tirmidhi"
  }
];

export const BOOKS = [
  {
    id: 1,
    title: "Ar-Raheeq Al-Makhtum",
    titleBn: "আর-রাহীকুল মাখতূম",
    author: "Safiur Rahman Mubarakpuri",
    cover: "https://m.media-amazon.com/images/I/81e+M7+G-TL._AC_UF1000,1000_QL80_.jpg",
    description: "The Sealed Nectar: Biography of the Noble Prophet (PBUH).",
    descriptionBn: "সীলমোহরকৃত অমৃত: মহানবী (সাঃ) এর জীবনী।"
  },
  {
    id: 2,
    title: "Riyad as-Salihin",
    titleBn: "রিয়াদুস সালেহীন",
    author: "Imam An-Nawawi",
    cover: "https://m.media-amazon.com/images/I/91Jk+u3tJ+L._AC_UF1000,1000_QL80_.jpg",
    description: "The Gardens of the Righteous: A collection of authentic Hadith.",
    descriptionBn: "ধার্মিকদের বাগান: সহীহ হাদিসের সংকলন।"
  },
  {
    id: 3,
    title: "Don't Be Sad",
    titleBn: "লা তাহযান (দুশ্চিন্তা করবেন না)",
    author: "Aaidh ibn Abdullah al-Qarni",
    cover: "https://m.media-amazon.com/images/I/41Jq+7y+G-L._AC_UF1000,1000_QL80_.jpg",
    description: "A practical guide to overcoming anxiety and sorrow from an Islamic perspective.",
    descriptionBn: "ইসলামী দৃষ্টিকোণ থেকে উদ্বেগ এবং দুঃখ কাটিয়ে ওঠার একটি ব্যবহারিক নির্দেশিকা।"
  }
];
