import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
export type ScriptType = 'uthmani' | 'indopak' | 'uthmani_simple' | 'imlaei';

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  scriptType: ScriptType;
  setScriptType: (script: ScriptType) => void;
  notifications: {
    dailyHadith: boolean;
    hifzReminder: boolean;
  };
  toggleNotification: (key: 'dailyHadith' | 'hifzReminder') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage or defaults
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem('theme') as Theme) || 'light'
  );
  const [fontSize, setFontSizeState] = useState(() => 
    Number(localStorage.getItem('fontSize')) || 3
  ); // 1-5 scale
  const [scriptType, setScriptTypeState] = useState<ScriptType>(() => 
    (localStorage.getItem('scriptType') as ScriptType) || 'uthmani'
  );
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : { dailyHadith: true, hifzReminder: true };
  });

  // Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persistence Wrappers
  const setFontSize = (size: number) => {
    setFontSizeState(size);
    localStorage.setItem('fontSize', String(size));
  };

  const setScriptType = (script: ScriptType) => {
    setScriptTypeState(script);
    localStorage.setItem('scriptType', script);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleNotification = (key: 'dailyHadith' | 'hifzReminder') => {
    setNotifications((prev: any) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('notifications', JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{
      theme,
      toggleTheme,
      fontSize,
      setFontSize,
      scriptType,
      setScriptType,
      notifications,
      toggleNotification
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
