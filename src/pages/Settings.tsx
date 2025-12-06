import React from 'react';
import { Moon, Sun, Bell, Type, Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings, ScriptType } from '../context/SettingsContext';
import { cn } from '../lib/utils';

const SCRIPT_OPTIONS: { id: ScriptType; label: string }[] = [
  { id: 'uthmani', label: 'Uthmani (Standard)' },
  { id: 'indopak', label: 'IndoPak (South Asian)' },
  { id: 'uthmani_simple', label: 'Simple (No Marks)' },
];

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { 
    theme, toggleTheme, 
    fontSize, setFontSize, 
    scriptType, setScriptType,
    notifications, toggleNotification 
  } = useSettings();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 pb-24">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('nav.settings')}</h1>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
           <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
             {theme === 'light' ? <Sun className="w-5 h-5 text-emerald-600" /> : <Moon className="w-5 h-5 text-emerald-400" />} 
             Appearance
           </h2>
           
           {/* Dark Mode */}
           <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">Dark Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={cn(
                  "w-14 h-8 rounded-full relative transition-colors duration-300 focus:outline-none",
                  theme === 'dark' ? "bg-emerald-500" : "bg-gray-200"
                )}
              >
                 <div className={cn(
                   "w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm transition-transform duration-300",
                   theme === 'dark' ? "left-7" : "left-1"
                 )}></div>
              </button>
           </div>

           {/* Font Size */}
           <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">Quran Font Size</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Adjust the size of Arabic text</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                 <button 
                   onClick={() => setFontSize(Math.max(1, fontSize - 1))}
                   className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md text-xs font-medium w-10 dark:text-white"
                 >
                   A-
                 </button>
                 <span className="text-sm font-bold w-8 text-center dark:text-white">{fontSize}</span>
                 <button 
                   onClick={() => setFontSize(Math.min(7, fontSize + 1))}
                   className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md text-sm font-bold w-10 dark:text-white"
                 >
                   A+
                 </button>
              </div>
           </div>

           {/* Script Preference */}
           <div className="py-4">
              <div className="mb-3">
                <p className="font-medium text-gray-700 dark:text-gray-200">Quran Script</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred reading style</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCRIPT_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setScriptType(opt.id)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-between",
                      scriptType === opt.id 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-400" 
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    )}
                  >
                    {opt.label}
                    {scriptType === opt.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Language */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
           <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
             <Globe className="w-5 h-5 text-emerald-600" /> Language
           </h2>
           <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">App Interface</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    language === 'en' ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  )}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('bn')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    language === 'bn' ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                  )}
                >
                  বাংলা
                </button>
              </div>
           </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
           <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
             <Bell className="w-5 h-5 text-emerald-600" /> Notifications
           </h2>
           <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">Daily Hadith</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Receive a daily notification</p>
              </div>
              <button 
                onClick={() => toggleNotification('dailyHadith')}
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-200",
                  notifications.dailyHadith ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                )}
              >
                 <div className={cn(
                   "w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all",
                   notifications.dailyHadith ? "right-1" : "left-1"
                 )}></div>
              </button>
           </div>
           <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">Hifz Reminders</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Remind me to review memorization</p>
              </div>
              <button 
                onClick={() => toggleNotification('hifzReminder')}
                className={cn(
                  "w-12 h-6 rounded-full relative transition-colors duration-200",
                  notifications.hifzReminder ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                )}
              >
                 <div className={cn(
                   "w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all",
                   notifications.hifzReminder ? "right-1" : "left-1"
                 )}></div>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
