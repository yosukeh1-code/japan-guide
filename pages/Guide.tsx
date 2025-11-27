import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';
import { Send, User, Bot, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Note: In a real app we'd pass language here to update the greeting message dynamically
export const Guide: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "Konnichiwa! (Hello!) 🇯🇵 I am your personal Japan travel guide. \n\nI can help you with:\n* **Itineraries:** \"Plan a 3-day trip to Kyoto\"\n* **Food:** \"Best ramen in Osaka?\"\n* **Etiquette:** \"How do I use chopsticks properly?\"\n* **Transport:** \"How to use the Shinkansen?\"\n\nWhat would you like to know?",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Note: We are currently defaulting to English or the browser's implicit context for the guide
    // To make this fully multi-lingual we would pass the language state down from App
    const response = await sendMessageToGemini(messages.concat(userMsg), userMsg.text);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: MessageRole.MODEL,
      text: response.text,
      timestamp: Date.now(),
      groundingLinks: response.groundingLinks
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pt-16 pb-20 min-h-screen bg-slate-50 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-500" />
          AI Travel Assistant
        </h1>
        <p className="text-xs text-slate-500 mt-1">Powered by Google Gemini</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === MessageRole.USER ? 'bg-indigo-500' : 'bg-rose-500'
              }`}>
                {msg.role === MessageRole.USER ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              {/* Bubble */}
              <div className={`flex flex-col`}>
                <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                  msg.role === MessageRole.USER 
                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'
                }`}>
                  {msg.role === MessageRole.USER ? (
                    <p>{msg.text}</p>
                  ) : (
                    <div className="prose prose-sm prose-slate max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>

                {/* Grounding Links (Maps) */}
                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.groundingLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-sm"
                      >
                        {link.sourceType === 'maps' ? <MapPin className="w-3 h-3 text-rose-500" /> : <ExternalLink className="w-3 h-3 text-blue-500" />}
                        {link.title}
                      </a>
                    ))}
                  </div>
                )}
                
                <span className={`text-[10px] mt-1 opacity-50 ${msg.role === MessageRole.USER ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex gap-3 max-w-[70%]">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about trains, food, or places..."
            className="w-full pl-5 pr-12 py-3.5 bg-slate-100 border-0 rounded-full text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all outline-none shadow-inner placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
