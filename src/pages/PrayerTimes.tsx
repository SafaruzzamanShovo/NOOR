import React, { useEffect, useState } from 'react';
import { prayerApi, PrayerTimesData } from '../services/prayer';
import { useLanguage } from '../context/LanguageContext';
import { Clock, MapPin, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { cn } from '../lib/utils';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PrayerTimes() {
  const { t, language } = useLanguage();
  const [timings, setTimings] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<string>('');

  useEffect(() => {
    const fetchTimings = async () => {
      setLoading(true);
      const data = await prayerApi.getTimings();
      setTimings(data);
      setLoading(false);
      
      // Simple logic to find next prayer (mocked for now as real time calc requires parsing)
      setNextPrayer('Asr'); 
    };
    fetchTimings();
  }, []);

  if (loading) return <LoadingSpinner />;

  const prayers = [
    { name: 'Fajr', nameBn: 'ফজর', time: timings?.Fajr, icon: Sunrise },
    { name: 'Dhuhr', nameBn: 'যোহর', time: timings?.Dhuhr, icon: Sun },
    { name: 'Asr', nameBn: 'আসর', time: timings?.Asr, icon: Sun },
    { name: 'Maghrib', nameBn: 'মাগরিব', time: timings?.Maghrib, icon: Sunset },
    { name: 'Isha', nameBn: 'ইশা', time: timings?.Isha, icon: Moon },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{t('prayers.location')}</span>
          </div>
          <h1 className="text-4xl font-bold mb-1">{t('prayers.next')}: {language === 'bn' ? 'আসর' : 'Asr'}</h1>
          <p className="text-emerald-100 text-lg">in 2 hours 15 minutes</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
           <Clock className="w-48 h-48 -mr-10 -mb-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {prayers.map((prayer) => (
          <div key={prayer.name} className={cn(
            "bg-white dark:bg-gray-800 rounded-2xl p-6 border shadow-sm flex flex-col items-center justify-center gap-3 transition-all",
            nextPrayer === prayer.name 
              ? "border-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-900/30" 
              : "border-gray-100 dark:border-gray-700"
          )}>
             <prayer.icon className={cn(
               "w-8 h-8",
               nextPrayer === prayer.name ? "text-emerald-600" : "text-gray-400"
             )} />
             <div className="text-center">
               <h3 className="font-bold text-gray-900 dark:text-gray-100">{language === 'bn' ? prayer.nameBn : prayer.name}</h3>
               <p className="text-lg font-mono text-gray-600 dark:text-gray-300">{prayer.time}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
