import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, TrendingUp, Award, Plus, Book, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HifzItem } from '../types/quran';
import { SURAHS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Hifz() {
  const { t } = useLanguage();
  const [items, setItems] = useState<HifzItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [newSurahId, setNewSurahId] = useState(1);
  const [newStartAyah, setNewStartAyah] = useState(1);
  const [newEndAyah, setNewEndAyah] = useState(5);

  useEffect(() => {
    const saved = localStorage.getItem('hifz_data');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const saveItems = (newItems: HifzItem[]) => {
    setItems(newItems);
    localStorage.setItem('hifz_data', JSON.stringify(newItems));
  };

  const handleAddItem = () => {
    const surah = SURAHS.find(s => s.id === Number(newSurahId));
    const newItem: HifzItem = {
      id: Date.now().toString(),
      surahId: Number(newSurahId),
      surahName: surah?.name_simple || `Surah ${newSurahId}`,
      startAyah: Number(newStartAyah),
      endAyah: Number(newEndAyah),
      status: 'memorizing',
      lastReviewed: new Date().toISOString(),
      nextReview: new Date(Date.now() + 86400000).toISOString(), // +1 Day
      strength: 1,
      createdAt: new Date().toISOString()
    };
    saveItems([...items, newItem]);
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    saveItems(items.filter(i => i.id !== id));
  };

  const handleReview = (id: string, strength: number) => {
    const updated = items.map(item => {
      if (item.id === id) {
        // Simple Spaced Repetition Logic
        const intervalDays = strength === 5 ? 7 : strength === 4 ? 4 : strength === 3 ? 2 : 1;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + intervalDays);
        
        return {
          ...item,
          lastReviewed: new Date().toISOString(),
          nextReview: nextDate.toISOString(),
          strength,
          status: strength === 5 ? 'mastered' : 'reviewing'
        };
      }
      return item;
    });
    saveItems(updated as HifzItem[]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <header className="flex justify-between items-end bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
         <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('nav.hifz')}</h1>
            <p className="text-gray-500">Track your memorization journey and revision schedule.</p>
         </div>
         <button 
           onClick={() => setShowAddModal(true)}
           className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
         >
            <Plus className="w-5 h-5" /> Log New Hifz
         </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Memorized', value: items.length, icon: Book, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           { label: 'Mastered', value: items.filter(i => i.status === 'mastered').length, icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
           { label: 'Due Today', value: items.filter(i => new Date(i.nextReview) <= new Date()).length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
           { label: 'Streak', value: '3 Days', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
         ].map((stat) => (
           <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                 <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Active Goals List */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
               <Calendar className="w-5 h-5 text-emerald-600" />
               Your Memorization Goals
            </h3>
            
            {items.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No memorization goals yet. Start by adding one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                   const isDue = new Date(item.nextReview) <= new Date();
                   return (
                     <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
                                item.status === 'mastered' ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
                              )}>
                                {item.surahId}
                              </div>
                              <div>
                                 <h4 className="font-bold text-gray-900 text-lg">{item.surahName}</h4>
                                 <p className="text-sm text-gray-500">Ayah {item.startAyah} - {item.endAyah}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              {isDue && <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Due Review</span>}
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-2 border-t border-gray-50 pt-4">
                           <span className="text-xs font-medium text-gray-500 uppercase mr-2">Log Review:</span>
                           {[1, 2, 3, 4, 5].map((score) => (
                             <button
                               key={score}
                               onClick={() => handleReview(item.id, score)}
                               className={cn(
                                 "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                                 item.strength >= score ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                               )}
                               title={`Rate ${score}/5`}
                             >
                               {score}
                             </button>
                           ))}
                        </div>
                     </div>
                   );
                })}
              </div>
            )}
         </div>

         {/* Sidebar Stats */}
         <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-xl">
               <h3 className="font-bold text-lg mb-2">Weekly Challenge</h3>
               <p className="text-emerald-100 text-sm mb-4">Memorize Surah Al-Mulk (Ayah 1-5) by Friday.</p>
               <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div className="bg-white h-2 rounded-full w-[40%]"></div>
               </div>
               <p className="text-xs text-emerald-200 text-right">40% Complete</p>
            </div>
         </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}
             />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
               className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative z-10"
             >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Log New Memorization</h2>
                
                <div className="space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Surah Number</label>
                      <input 
                        type="number" min="1" max="114"
                        value={newSurahId} onChange={(e) => setNewSurahId(Number(e.target.value))}
                        className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Ayah</label>
                        <input 
                          type="number" min="1"
                          value={newStartAyah} onChange={(e) => setNewStartAyah(Number(e.target.value))}
                          className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Ayah</label>
                        <input 
                          type="number" min="1"
                          value={newEndAyah} onChange={(e) => setNewEndAyah(Number(e.target.value))}
                          className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                   </div>
                </div>

                <div className="flex gap-3 mt-8">
                   <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                   <button onClick={handleAddItem} className="flex-1 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">Save Goal</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
