import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayahId: number;
  surahName: string;
}

export default function NotesModal({ isOpen, onClose, ayahId, surahName }: NotesModalProps) {
  const [note, setNote] = useState('');
  const storageKey = `note_${ayahId}`;

  useEffect(() => {
    if (isOpen) {
      const savedNote = localStorage.getItem(storageKey);
      if (savedNote) setNote(savedNote);
    }
  }, [isOpen, storageKey]);

  const handleSave = () => {
    if (note.trim()) {
      localStorage.setItem(storageKey, note);
    } else {
      localStorage.removeItem(storageKey);
    }
    onClose();
  };

  const handleDelete = () => {
    localStorage.removeItem(storageKey);
    setNote('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[80vh]">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">My Reflections</h3>
                  <p className="text-xs text-gray-500">{surahName}, Ayah {ayahId}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-5 flex-1">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your thoughts, reflections, or lessons learned from this Ayah..."
                  className="w-full h-64 p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 resize-none text-gray-700 placeholder-gray-400 leading-relaxed"
                  autoFocus
                />
              </div>

              <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-2xl">
                <button 
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/10"
                >
                  <Save className="w-4 h-4" /> Save Note
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
