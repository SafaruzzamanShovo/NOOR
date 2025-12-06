import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Mic, User, Bot, Lightbulb, BookOpen, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type?: 'text' | 'analysis';
};

const SUGGESTED_PROMPTS = [
  { icon: BookOpen, text: "Explain Surah Al-Fatiha" },
  { icon: Lightbulb, text: "Grammar of 'Alhamdulillah'" },
  { icon: HelpCircle, text: "Benefits of Ayatul Kursi" },
];

export default function AITeacher() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Assalamu Alaikum! I am your AI Quran Teacher. I can explain Ayahs, check your Tajweed, or answer questions about Islamic history. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate Intelligent Response
    setTimeout(() => {
      let responseText = "I can help you with that. Could you specify which Surah or Ayah you are referring to?";
      
      if (text.toLowerCase().includes('fatiha')) {
        responseText = "**Surah Al-Fatiha (The Opener)** is the greatest Surah in the Quran. \n\n1. **Themes**: It summarizes the Quran: Tawheed (Oneness of God), Risalah (Prophethood), and Akhirah (Afterlife).\n2. **Key Verse**: *Iyyaka Na'budu* (You alone we worship) is the core statement of servitude.\n3. **Action**: It is recited in every unit of prayer (Salah).";
      } else if (text.toLowerCase().includes('grammar')) {
        responseText = "Let's look at the grammar. \n\n**Al-Hamdu**: Noun (Ism), Definite article 'Al' indicates all praise belongs to Allah.\n**Li-llahi**: Preposition 'Li' (for) + Allah. \n\nThis sentence is a Nominal Sentence (Jumla Ismiyya) indicating permanence.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">Ustadh AI</h2>
              <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Online & Ready
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/50" ref={scrollRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-gray-200" : "bg-white border border-gray-100"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-gray-500" /> : <Bot className="w-5 h-5 text-emerald-600" />}
              </div>
              <div className={cn(
                "p-5 rounded-3xl text-sm leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-gray-900 text-white rounded-tr-none" 
                  : "bg-white border border-gray-100 text-gray-700 rounded-tl-none"
              )}>
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-[80%]">
               <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-emerald-600" />
               </div>
               <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200"></span>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          {messages.length < 3 && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-xl text-xs font-medium text-gray-600 hover:text-emerald-700 transition-all whitespace-nowrap"
                >
                  <prompt.icon className="w-3 h-3" />
                  {prompt.text}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-50 transition-all">
            <button className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about an Ayah, topic, or grammar..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-sm font-medium"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
