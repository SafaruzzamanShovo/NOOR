import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, MessageCircle, Heart, Settings, Menu, X, Activity, Clock, Book, Library } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SidebarItem = ({ icon: Icon, label, to, active }: { icon: any, label: string, to: string, active: boolean }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium shadow-sm" 
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 group-hover:text-emerald-500")} />
    <span>{label}</span>
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { icon: Home, label: t('nav.home'), to: "/" },
    { icon: BookOpen, label: t('nav.read'), to: "/read" },
    { icon: Clock, label: t('nav.prayers'), to: "/prayers" },
    { icon: Activity, label: t('nav.hifz'), to: "/hifz" },
    { icon: Book, label: t('nav.dua'), to: "/dua" },
    { icon: Library, label: t('nav.library'), to: "/library" },
    { icon: MessageCircle, label: t('nav.ai_teacher'), to: "/ai-teacher" },
    { icon: Heart, label: t('nav.emotions'), to: "/emotions" },
    { icon: Settings, label: t('nav.settings'), to: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex font-sans transition-colors duration-300">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-transform duration-300 lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Hidaya</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">Menu</div>
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              {...item} 
              active={location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))} 
            />
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-1">Daily Goal</p>
            <div className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-2 mb-2">
              <div className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full w-[40%]"></div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">2/5 Ayahs Memorized</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 transition-colors duration-300">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex-1 lg:flex-none"></div>
          <div className="flex items-center gap-4">
             <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button 
                  onClick={() => setLanguage('en')}
                  className={cn("px-3 py-1 text-xs font-medium rounded-full transition-all", language === 'en' ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-200" : "text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('bn')}
                  className={cn("px-3 py-1 text-xs font-medium rounded-full transition-all", language === 'bn' ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-200" : "text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                >
                  বাংলা
                </button>
             </div>
             <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm border border-emerald-200 dark:border-emerald-800">
                U
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
