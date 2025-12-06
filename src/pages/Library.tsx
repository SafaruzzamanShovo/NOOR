import React, { useState } from 'react';
import { BOOKS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { Search, BookOpen, Download, Plus } from 'lucide-react';

export default function Library() {
  const { t, language } = useLanguage();
  const [requestMode, setRequestMode] = useState(false);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('library.title')}</h1>
          <p className="text-gray-500">Authentic Islamic books and resources.</p>
        </div>
        <button 
          onClick={() => setRequestMode(!requestMode)}
          className="bg-gray-900 dark:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> {t('library.request')}
        </button>
      </div>

      {requestMode && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
           <h3 className="font-bold text-emerald-800 dark:text-emerald-400 mb-4">Request a Book</h3>
           <div className="flex gap-4">
             <input type="text" placeholder="Book Title / Author" className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800" />
             <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700">Submit</button>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BOOKS.map((book) => (
          <div key={book.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
             <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                   <button className="bg-white text-gray-900 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50">
                     <BookOpen className="w-4 h-4" /> {t('library.read')}
                   </button>
                </div>
             </div>
             <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 leading-tight">
                  {language === 'bn' ? book.titleBn : book.title}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-3">{book.author}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                  {language === 'bn' ? book.descriptionBn : book.description}
                </p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
