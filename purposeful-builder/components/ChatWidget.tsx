'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

type Message = { role: 'user' | 'bot'; text: string };

const INITIAL_BOT_MESSAGE = "Hi! I am Austin's AI assistant. Ask me anything about his books, launch dates, writings, or work!";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: INITIAL_BOT_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages.filter(m => m.role !== 'bot' || m.text !== INITIAL_BOT_MESSAGE) 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error. ' + (data.error || '') }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Network error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-[#182016] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col text-stone-900 dark:text-stone-100"
            style={{ height: '520px', maxHeight: '82vh' }}
          >
            {/* Header */}
            <div className="bg-gray-900 dark:bg-[#11170f] text-white p-4 flex justify-between items-center border-b border-black/10 dark:border-white/10">
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Ask Austin's AI</h3>
                <p className="text-xs text-gray-300">Books, launch dates, essays, & work.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#141a12]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#c4572a] text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#c4572a] text-white rounded-tr-none' : 'bg-white dark:bg-[#1d261a] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-stone-200 rounded-tl-none shadow-sm whitespace-pre-wrap'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] flex-row">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      <Bot size={16} />
                    </div>
                    <div className="p-3 rounded-2xl text-sm bg-white dark:bg-[#1d261a] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-stone-200 rounded-tl-none shadow-sm flex items-center">
                      <Loader2 size={16} className="animate-spin text-[#c4572a]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-[#182016] border-t border-gray-200 dark:border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question (e.g. launch date, books)..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#c4572a] text-sm text-black dark:text-white bg-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#c4572a] text-white p-2.5 rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-900 dark:bg-[#c4572a] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
