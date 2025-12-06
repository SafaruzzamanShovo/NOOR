import axios from 'axios';
import { Chapter, Verse, TafsirResponse } from '../types/quran';

const API_BASE = 'https://api.quran.com/api/v4';

// Resource IDs
export const RESOURCES = {
  TRANSLATION_EN: 131, // The Clear Quran
  TRANSLATION_BN: 163, // Bengali - Muhiuddin Khan
  
  // Tafsirs
  TAFSIR_IBN_KATHIR_EN: 169,
  TAFSIR_MAARIFUL_EN: 171, // Using Maududi as proxy for deep English tafsir if Maariful unavailable via simple ID
  TAFSIR_ZAKARIA_BN: 165, // Tafsir Zakaria (Authentic Bangla)
  TAFSIR_BAYAAN_BN: 166, // Tafsir Ahsanul Bayaan
  
  RECITERS: {
    mishary: 7, // Mishary Rashid Alafasy
    sudais: 3, // Abdur-Rahman as-Sudais
    minshawi: 10, // Mohamed Siddiq El-Minshawi
    afif: 109, // Abdullah Al-Afif
    husary: 5, // Mahmoud Khalil Al-Husary (Teacher style)
  }
};

export const quranApi = {
  async getChapters(language: 'en' | 'bn' = 'en'): Promise<Chapter[]> {
    try {
      const response = await axios.get(`${API_BASE}/chapters`, {
        params: { language }
      });
      return response.data.chapters;
    } catch (error) {
      console.error('Error fetching chapters:', error);
      return [];
    }
  },

  async getVerses(
    chapterId: number, 
    language: 'en' | 'bn', 
    reciterId: number = 7,
    page: number = 1
  ): Promise<Verse[]> {
    const translationId = language === 'bn' ? RESOURCES.TRANSLATION_BN : RESOURCES.TRANSLATION_EN;
    
    try {
      const response = await axios.get(`${API_BASE}/verses/by_chapter/${chapterId}`, {
        params: {
          language,
          words: true,
          translations: translationId,
          audio: reciterId,
          page,
          per_page: 10,
          // CRITICAL: Requesting specific script fields for WORDS
          word_fields: 'text_uthmani,text_indopak,text_uthmani_simple,text_imlaei,translation,transliteration',
          // Requesting specific script fields for VERSES (fallback)
          fields: 'text_uthmani,text_indopak,text_uthmani_simple,text_imlaei'
        }
      });
      
      return response.data.verses.map((v: any) => ({
        ...v,
        audio: { url: `https://verses.quran.com/${v.audio.url}` }
      }));
    } catch (error) {
      console.error('Error fetching verses:', error);
      return [];
    }
  },

  async getTafsir(verseKey: string, resourceId: number): Promise<TafsirResponse | null> {
    try {
      const response = await axios.get(`${API_BASE}/tafsirs/${resourceId}/by_ayah/${verseKey}`);
      return response.data.tafsir;
    } catch (error) {
      console.error('Error fetching tafsir:', error);
      return null;
    }
  },

  getReciterId(id: string): number {
    return RESOURCES.RECITERS[id as keyof typeof RESOURCES.RECITERS] || 7;
  }
};
