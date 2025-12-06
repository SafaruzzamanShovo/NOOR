import React, { useState } from 'react';
import { EMOTIONS, EMOTION_VERSES } from '../data/mockData';
import { cn } from '../lib/utils';
import { ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Emotions() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const activeEmotion = EMOTIONS.find(e => e.id === selectedEmotion);
  const verses = selectedEmotion ? EMOTION_VERSES[selectedEmotion] : [];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 text-rose-600 rounded-full mb-4">
           <Heart className="w-8 h-8 fill-current" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('emotions.title')}</h1>
        <p className="text-gray-500 text-lg">{t('emotions.subtitle')}</p>
      </div>

      {!selectedEmotion ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {EMOTIONS.map((emotion, idx) => (
            <motion.button
              key={emotion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedEmotion(emotion.id)}
              className={cn(
                "h-40 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-lg",
                emotion.color
              )}
            >
              <span className="text-4xl">{emotion.icon}</span>
              <span className="font-semibold text-lg">{language === 'bn' ? emotion.labelBn : emotion.label}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <button 
            onClick={() => setSelectedEmotion(null)}
            className="text-sm text-gray-500 hover:text-gray-800 mb-4 flex items-center gap-1"
          >
            ← {t('emotions.back')}
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{activeEmotion?.icon}</span>
                <h2 className="text-2xl font-bold text-gray-800">
                  {t('emotions.for_when')} {language === 'bn' ? activeEmotion?.labelBn : activeEmotion?.label}
                </h2>
             </div>

             <div className="space-y-8">
                {verses?.map((verse, idx) => (
                  <div key={idx} className="border-l-4 border-emerald-500 pl-6 py-2">
                     <p className="text-2xl font-serif text-gray-800 mb-4 leading-loose text-right" dir="rtl">
                       {verse.arabic}
                     </p>
                     <p className="text-lg text-gray-600 italic mb-2">
                       "{language === 'bn' ? verse.translationBn : verse.translation}"
                     </p>
                     <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">{verse.reference}</p>
                     
                     {/* Link to specific Surah */}
                     <div className="mt-4">
                       <Link 
                         to={`/read?surah=${verse.surahId}`}
                         className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                       >
                         Read Full Surah <ArrowRight className="w-4 h-4" />
                       </Link>
                     </div>
                  </div>
                ))}
                
                {verses.length === 0 && (
                    <p className="text-gray-500 italic">No specific verses found for this emotion in our demo database.</p>
                )}
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
