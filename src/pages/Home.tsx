import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Quote, Search } from 'lucide-react';
import { DAILY_HADITHS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { quranApi } from '../services/quran';
import { Chapter } from '../types/quran';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const { t, language } = useLanguage();
  const dailyHadith = DAILY_HADITHS[0];
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      const data = await quranApi.getChapters(language);
      setChapters(data);
      setLoading(false);
    };
    fetchChapters();
  }, [language]);

  const filteredChapters = chapters.filter(c => 
    c.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name_complex.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(c.id).includes(searchQuery)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-8 lg:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-4 border border-white/10">
            Ramadan Prep Mode
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
            {t('hero.title')} <span className="text-emerald-200">Al-Kahf</span>
          </h1>
          <p className="text-emerald-100 mb-8 text-lg max-w-lg">
            {t('hero.subtitle')} 14.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/read?surah=18" className="bg-white text-emerald-800 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/20">
              <Play className="w-4 h-4 fill-current" /> {t('hero.cta')}
            </Link>
            <Link to="/ai-teacher" className="bg-emerald-700/50 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700/70 transition-colors border border-white/10">
              {t('hero.ask_ai')}
            </Link>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
             <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.2,32.6C60.2,43.7,49.5,53,37.6,61.3C25.7,69.6,12.6,76.9,-1.8,80C-16.2,83.1,-30.7,82,-43.2,74.8C-55.7,67.6,-66.2,54.3,-74.2,39.9C-82.2,25.5,-87.7,10,-86.8,-5.1C-85.9,-20.2,-78.6,-34.9,-68.1,-47.3C-57.6,-59.7,-43.9,-69.8,-29.9,-77.1C-15.9,-84.4,-1.6,-88.9,13.8,-88.3C29.2,-87.7,44.7,-82,44.7,-76.4Z" transform="translate(100 100)" />
           </svg>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
           <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
             <h2 className="text-2xl font-bold text-gray-800">{t('surah.index')}</h2>
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Surah..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none w-full sm:w-64"
                />
             </div>
           </div>
           
           {loading ? (
             <LoadingSpinner />
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {filteredChapters.map((surah) => (
                 <Link 
                   key={surah.id} 
                   to={`/read?surah=${surah.id}`}
                   className="group bg-white p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200 flex items-center gap-4"
                 >
                   <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-700 font-bold group-hover:bg-emerald-50 transition-colors relative overflow-hidden flex-shrink-0">
                     <span className="relative z-10">{surah.id}</span>
                     <div className="absolute inset-0 bg-emerald-100 opacity-0 group-hover:opacity-20 transition-opacity rotate-45 transform scale-150"></div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                          {surah.name_simple}
                        </h3>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{t(`surah.${surah.revelation_place}`)}</span>
                     </div>
                     <p className="text-sm text-gray-500 truncate">{surah.translated_name.name} • {surah.verses_count} Ayahs</p>
                   </div>
                   <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all flex-shrink-0" />
                 </Link>
               ))}
             </div>
           )}
        </div>

        <div className="md:col-span-1">
           <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('home.hadith_day')}</h2>
           <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 relative">
              <Quote className="w-8 h-8 text-amber-200 absolute top-4 right-4 rotate-180" />
              <div className="mb-4">
                 <p className="text-gray-800 font-medium leading-relaxed italic">
                    "{language === 'bn' ? dailyHadith.textBn : dailyHadith.text}"
                 </p>
              </div>
              <div className="flex items-center gap-2 border-t border-amber-100 pt-3">
                 <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                 <p className="text-xs text-amber-700 font-bold uppercase tracking-wide">{dailyHadith.source}</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
