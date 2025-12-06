import React from 'react';
import { DUAS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { Book, Heart, Share2 } from 'lucide-react';

export default function Dua() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto py-8">
       <div className="text-center mb-10">
         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('dua.title')}</h1>
         <p className="text-gray-500">Supplications from Quran and Sunnah</p>
       </div>

       <div className="grid gap-6">
         {DUAS.map((dua) => (
           <div key={dua.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                 <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wide">
                   {language === 'bn' ? dua.categoryBn : dua.category}
                 </span>
                 <div className="flex gap-2 text-gray-400">
                    <button className="hover:text-emerald-600"><Heart className="w-4 h-4" /></button>
                    <button className="hover:text-emerald-600"><Share2 className="w-4 h-4" /></button>
                 </div>
              </div>

              <div className="text-right mb-6">
                 <p className="text-2xl lg:text-3xl font-quran leading-loose text-gray-800 dark:text-gray-100" dir="rtl">
                   {dua.arabic}
                 </p>
              </div>

              <div className="space-y-2">
                 <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium italic">
                   {dua.transliteration}
                 </p>
                 <p className="text-gray-700 dark:text-gray-300 text-lg">
                   {language === 'bn' ? dua.translationBn : dua.translation}
                 </p>
                 <p className="text-xs text-gray-400 mt-2">— {dua.reference}</p>
              </div>
           </div>
         ))}
       </div>
    </div>
  );
}
