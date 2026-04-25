'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function VoxAssist() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSimpleMode } = useLanguage();
  const [messages, setMessages] = useState<{role: 'user'|'agent', text: string}[]>([
    { role: 'agent', text: "Hello! I am VoxAssist, your unbiased election process companion. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate Agentic reasoning delay
    setTimeout(() => {
      let response = "";
      if (isSimpleMode) {
        response = "Based on the rules, if you lost your name from the voter list, you need to quickly fill out Form 6. You can do this on the official website. Let me know if you need the link!";
      } else {
        response = "According to the statutory guidelines for the Special Intensive Revision (SIR), if your name was deleted, you must immediately submit Form 6 for inclusion before the nomination deadline. The procedure is outlined under the Representation of the People Act, 1950.";
      }
      setMessages(prev => [...prev, { role: 'agent', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-civic-saffron text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all z-50 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open VoxAssist Chat"
      >
        <span className="text-3xl" aria-hidden="true">💬</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8">
          
          <div className="bg-civic-blue text-white p-4 flex justify-between items-center shadow-md z-10">
            <h3 className="font-bold flex items-center gap-2">
              <span aria-hidden="true">🤖</span> VoxAssist (Live QA)
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-slate-200 focus:outline-none text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 p-4 h-80 overflow-y-auto bg-slate-50 dark:bg-slate-900 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-civic-blue text-white self-end rounded-br-none' 
                  : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 self-start border border-slate-200 dark:border-slate-600 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-white dark:bg-slate-700 self-start border border-slate-200 dark:border-slate-600 rounded-bl-none text-slate-500 flex items-center gap-1">
                <span className="animate-bounce inline-block w-1 h-1 bg-slate-400 rounded-full"></span>
                <span className="animate-bounce inline-block w-1 h-1 bg-slate-400 rounded-full" style={{animationDelay: '0.2s'}}></span>
                <span className="animate-bounce inline-block w-1 h-1 bg-slate-400 rounded-full" style={{animationDelay: '0.4s'}}></span>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a civic question..." 
              className="flex-1 px-3 py-2 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-civic-blue text-sm"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="bg-civic-blue text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
            >
              <span aria-hidden="true">➤</span>
            </button>
          </form>

        </div>
      )}
    </>
  );
}
