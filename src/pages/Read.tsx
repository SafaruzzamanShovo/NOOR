import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RECITERS } from '../data/mockData';
import { Play, Pause, BookOpen, StickyNote, Type, ChevronDown, X, Repeat, Mic, Settings2, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSettings, ScriptType } from '../context/SettingsContext';
import NotesModal from '../components/NotesModal';
import { quranApi, RESOURCES } from '../services/quran';
import { Verse, Word as WordType } from '../types/quran';
import LoadingSpinner from '../components/LoadingSpinner';

const SCRIPT_OPTIONS: { id: ScriptType; label: string; desc: string }[] = [
  { id: 'indopak', label: 'IndoPak', desc: 'South Asian Style' },
  { id: 'uthmani', label: 'Uthmani', desc: 'Madinah Standard' },
  { id: 'uthmani_simple', label: 'Simple', desc: 'No Marks' },
];

const TAFSIR_OPTIONS = [
  { id: RESOURCES.TAFSIR_IBN_KATHIR_EN, label: 'Ibn Kathir (En)', lang: 'en' },
  { id: RESOURCES.TAFSIR_ZAKARIA_BN, label: 'Tafsir Zakaria (Bn)', lang: 'bn' },
  { id: RESOURCES.TAFSIR_BAYAAN_BN, label: 'Ahsanul Bayaan (Bn)', lang: 'bn' },
];

const Word = ({ word, scriptType, fontSize }: { word: WordType, scriptType: ScriptType, fontSize: number }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  let text = word.text_uthmani; 
  if (scriptType === 'indopak' && word.text_indopak) text = word.text_indopak;
  else if (scriptType === 'uthmani_simple' && word.text_uthmani_simple) text = word.text_uthmani_simple;
  else if (scriptType === 'imlaei' && word.text_imlaei) text = word.text_imlaei;
  
  const baseSize = 30 + (fontSize * 4); 
  const lineHeight = scriptType === 'indopak' ? 2.5 : 2.2;
  const fontClass = scriptType === 'indopak' ? 'font-indoPak' : 'font-quran';

  if (word.char_type_name === 'end') {
    return <span className={cn("text-emerald-600 px-2 select-none", fontClass)} style={{ fontSize: `${baseSize}px` }}>{text}</span>;
  }

  return (
    <div 
      className="relative group inline-block mx-1 my-1 cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div 
        className={cn("hover:text-emerald-600 transition-colors px-0.5 rounded text-gray-900 dark:text-gray-100", fontClass)}
        style={{ fontSize: `${baseSize}px`, lineHeight: lineHeight }}
      >
        {text}
      </div>
      
      <div className="text-xs text-gray-400 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute w-[150%] left-1/2 -translate-x-1/2 top-full pointer-events-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded py-1 shadow-sm z-10">
        {word.translation.text}
      </div>
    </div>
  );
};

const TafsirPanel = ({ verseKey, onClose }: { verseKey: string, onClose: () => void }) => {
  const { language: appLanguage } = useLanguage();
  const [selectedTafsirId, setSelectedTafsirId] = useState(
    appLanguage === 'bn' ? RESOURCES.TAFSIR_ZAKARIA_BN : RESOURCES.TAFSIR_IBN_KATHIR_EN
  );
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTafsir = async () => {
      setLoading(true);
      const data = await quranApi.getTafsir(verseKey, selectedTafsirId);
      setContent(data?.text || '<p class="text-gray-500 italic">Tafsir text not available.</p>');
      setLoading(false);
    };
    fetchTafsir();
  }, [verseKey, selectedTafsirId]);

  return (
    <div className="bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 h-full overflow-hidden w-full lg:w-[450px] flex-shrink-0 flex flex-col shadow-2xl z-30 fixed lg:sticky top-16 right-0 bottom-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 z-10 bg-white dark:bg-gray-900">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          Tafsir
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap gap-2">
          {TAFSIR_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedTafsirId(opt.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                selectedTafsirId === opt.id 
                  ? "bg-emerald-600 text-white border-emerald-600" 
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center p-8"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="prose prose-sm prose-emerald dark:prose-invert max-w-none">
             <div 
               className={cn("leading-relaxed text-gray-800 dark:text-gray-200", (selectedTafsirId === RESOURCES.TAFSIR_ZAKARIA_BN || selectedTafsirId === RESOURCES.TAFSIR_BAYAAN_BN) ? "font-serif text-base" : "")}
               dangerouslySetInnerHTML={{ __html: content }} 
             />
          </div>
        )}
      </div>
    </div>
  );
};

export default function Read() {
  const [searchParams] = useSearchParams();
  const surahId = Number(searchParams.get('surah')) || 1;
  
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);
  const [reciterId, setReciterId] = useState("mishary");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedVerseId, setSelectedVerseId] = useState<number | null>(null);
  const [mushafMode, setMushafMode] = useState(false);
  
  const { t, language } = useLanguage();
  const { fontSize, scriptType, setScriptType } = useSettings();
  const [isScriptDropdownOpen, setIsScriptDropdownOpen] = useState(false);
  const [isReciterDropdownOpen, setIsReciterDropdownOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentReciter = RECITERS.find(r => r.id === reciterId);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const apiReciterId = quranApi.getReciterId(reciterId);
      const data = await quranApi.getVerses(surahId, language, apiReciterId);
      setVerses(data);
      setLoading(false);
    };
    fetchContent();
  }, [surahId, language, reciterId]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.pause();
    if (verses.length > 0 && verses[currentVerseIndex]?.audio?.url) {
      audioRef.current = new Audio(verses[currentVerseIndex].audio?.url);
      audioRef.current.onended = () => {
         if (currentVerseIndex < verses.length - 1) setCurrentVerseIndex(prev => prev + 1);
         else setIsPlaying(false);
      };
      if (isPlaying) audioRef.current.play().catch(e => console.error(e));
    }
  }, [currentVerseIndex, verses, isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) { setIsPlaying(false); audioRef.current?.pause(); }
    else { setIsPlaying(true); audioRef.current?.play(); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      {/* Enhanced Toolbar */}
      {!mushafMode && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm z-20 sticky top-0 gap-4">
          <div className="flex items-center gap-4">
            {/* Audio Player Controls */}
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-full p-1.5 pr-4 border border-gray-200 dark:border-gray-700">
              <button 
                onClick={handlePlayPause}
                className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              
              <div className="relative">
                  <button 
                    onClick={() => setIsReciterDropdownOpen(!isReciterDropdownOpen)}
                    className="flex flex-col items-start text-left group"
                  >
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Reciter</span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-emerald-600 flex items-center gap-1">
                      {currentReciter?.name.split(' ')[0]}... <ChevronDown className="w-3 h-3" />
                    </span>
                  </button>

                  {isReciterDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setIsReciterDropdownOpen(false)} />
                      <div className="absolute top-full left-0 mt-4 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-40 p-2 max-h-80 overflow-y-auto custom-scrollbar">
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Select Reciter</div>
                        {RECITERS.map(r => (
                          <button 
                            key={r.id}
                            onClick={() => { setReciterId(r.id); setIsPlaying(false); setIsReciterDropdownOpen(false); }}
                            className={cn(
                              "w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between group transition-colors",
                              reciterId === r.id ? "bg-emerald-50 dark:bg-emerald-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                            )}
                          >
                            <div>
                              <div className={cn("font-bold", reciterId === r.id ? "text-emerald-700 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200")}>{r.name}</div>
                              <div className="text-xs text-gray-400">{r.style} • {r.country}</div>
                            </div>
                            {reciterId === r.id && <Mic className="w-4 h-4 text-emerald-600" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

            {/* Script Selector */}
            <div className="relative">
              <button 
                  onClick={() => setIsScriptDropdownOpen(!isScriptDropdownOpen)}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
              >
                  <Type className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-col items-start text-left leading-none">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Font</span>
                    <span className="font-semibold">{SCRIPT_OPTIONS.find(s => s.id === scriptType)?.label}</span>
                  </div>
                  <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              
              {isScriptDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsScriptDropdownOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-2">
                      <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Reading Style</div>
                      {SCRIPT_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => { setScriptType(option.id); setIsScriptDropdownOpen(false); }}
                          className={cn(
                            "w-full text-left px-3 py-3 rounded-lg text-sm flex items-center justify-between transition-colors",
                            scriptType === option.id 
                              ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" 
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          )}
                        >
                          <div>
                            <div className="font-bold">{option.label}</div>
                            <div className="text-xs opacity-70">{option.desc}</div>
                          </div>
                          {scriptType === option.id && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                        </button>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMushafMode(true)}
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Mushaf Mode"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowTafsir(!showTafsir)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm border", showTafsir ? "bg-emerald-600 text-white border-emerald-600" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50")}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">{t('reader.tafsir')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn("flex-1 flex overflow-hidden relative", mushafMode ? "bg-[#fdfbf7] dark:bg-[#1a1a1a]" : "bg-gray-50 dark:bg-gray-950")}>
        
        {mushafMode && (
          <button 
            onClick={() => setMushafMode(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
          >
            <Minimize2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        )}

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className={cn(
            "mx-auto transition-all duration-500",
            mushafMode ? "max-w-4xl py-12 px-8 bg-white dark:bg-gray-900 shadow-2xl min-h-full border-2 border-emerald-900/10 dark:border-emerald-500/10 rounded-sm" : "max-w-3xl space-y-6 pb-20"
          )}>
            
            {/* Bismillah Header */}
            <div className="text-center mb-10 pt-4">
               {!mushafMode && (
                 <div className="inline-block px-4 py-1 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 mb-4">
                   <span className="text-emerald-800 dark:text-emerald-400 font-bold tracking-wide uppercase text-xs">Surah {surahId}</span>
                 </div>
               )}
               {surahId !== 1 && surahId !== 9 && (
                 <div className={cn("text-3xl lg:text-4xl text-gray-800 dark:text-gray-100 mb-6 mt-2", scriptType === 'indopak' ? 'font-indoPak' : 'font-quran')}>
                   بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                 </div>
               )}
               {mushafMode && <div className="w-32 h-1 bg-emerald-500/20 mx-auto rounded-full mt-4"></div>}
            </div>

            {verses.map((verse, index) => (
              <div 
                key={verse.id} 
                className={cn(
                  "group relative transition-all duration-300",
                  mushafMode 
                    ? "mb-8 text-center" 
                    : cn(
                        "rounded-2xl p-6 lg:p-8 border bg-white dark:bg-gray-900",
                        currentVerseIndex === index 
                          ? "border-emerald-200 dark:border-emerald-800 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-50 dark:ring-emerald-900/30" 
                          : "border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                      )
                )}
                onClick={() => { setCurrentVerseIndex(index); setIsPlaying(true); }}
              >
                 {!mushafMode && (
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold">
                        {verse.verse_key.split(':')[1]}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedVerseId(verse.id); setShowNotesModal(true); }}
                            className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 rounded-lg transition-colors"
                          >
                            <StickyNote className="w-4 h-4" />
                          </button>
                      </div>
                   </div>
                 )}

                 {/* Arabic Text */}
                 <div 
                    className={cn(
                      "flex flex-wrap leading-relaxed",
                      mushafMode ? "justify-center text-center px-4" : "mb-8 text-right justify-start"
                    )} 
                    dir="rtl"
                 >
                    {verse.words.map((word, idx) => (
                      <Word key={idx} word={word} scriptType={scriptType} fontSize={fontSize + (mushafMode ? 2 : 0)} />
                    ))}
                    {mushafMode && (
                      <span className="inline-flex items-center justify-center w-8 h-8 mx-2 border border-emerald-600 rounded-full text-xs font-bold text-emerald-800 dark:text-emerald-400">
                        {verse.verse_key.split(':')[1]}
                      </span>
                    )}
                 </div>

                 {!mushafMode && (
                   <div className="pt-6 border-t border-gray-50 dark:border-gray-800">
                     <div className={cn(
                       "text-lg leading-relaxed transition-colors", 
                       currentVerseIndex === index ? "text-gray-800 dark:text-gray-100" : "text-gray-500 dark:text-gray-400",
                       language === 'bn' && "font-serif"
                     )}>
                        <span dangerouslySetInnerHTML={{ __html: verse.translations?.[0]?.text || '' }}></span>
                     </div>
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>

        {showTafsir && verses[currentVerseIndex] && !mushafMode && (
          <TafsirPanel verseKey={verses[currentVerseIndex].verse_key} onClose={() => setShowTafsir(false)} />
        )}
      </div>

      {selectedVerseId && (
        <NotesModal 
          isOpen={showNotesModal} 
          onClose={() => setShowNotesModal(false)}
          ayahId={selectedVerseId}
          surahName={`Surah ${surahId}`}
        />
      )}
    </div>
  );
}
