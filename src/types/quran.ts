export interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface Word {
  id: number;
  position: number;
  audio_url: string | null;
  char_type_name: string;
  text_uthmani: string;
  text_indopak: string;
  text_uthmani_simple: string;
  text_imlaei: string;
  translation: {
    text: string;
    language_name: string;
  };
  transliteration: {
    text: string;
    language_name: string;
  };
}

export interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  text_indopak: string;
  text_uthmani_simple: string;
  text_imlaei: string;
  words: Word[];
  translations?: Array<{
    id: number;
    resource_id: number;
    text: string;
  }>;
  audio?: {
    url: string;
  };
}

export interface Reciter {
  id: number;
  name: string;
  style?: string;
}

export interface TafsirInfo {
  id: number;
  name: string;
  author: string;
  language: string;
  slug: string;
}

export interface TafsirResponse {
  id: number;
  resource_id: number;
  text: string;
  resource_name?: string;
}

export interface HifzItem {
  id: string;
  surahId: number;
  surahName: string;
  startAyah: number;
  endAyah: number;
  status: 'memorizing' | 'reviewing' | 'mastered';
  lastReviewed: string; // ISO Date
  nextReview: string; // ISO Date
  strength: number; // 1-5
  createdAt: string;
}
