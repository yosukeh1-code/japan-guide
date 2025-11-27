import React, { useState } from 'react';
import { JAPAN_EVENTS, UI_TRANSLATIONS } from '../constants';
import { LanguageCode } from '../types';
import { Calendar, MapPin, Search } from 'lucide-react';

interface EventsProps {
  language: LanguageCode;
}

export const Events: React.FC<EventsProps> = ({ language }) => {
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const t = UI_TRANSLATIONS[language].events;
  const tCommon = UI_TRANSLATIONS[language].map; // Reusing some strings

  const months = [
    { num: 1, name: 'Jan' }, { num: 2, name: 'Feb' }, { num: 3, name: 'Mar' },
    { num: 4, name: 'Apr' }, { num: 5, name: 'May' }, { num: 6, name: 'Jun' },
    { num: 7, name: 'Jul' }, { num: 8, name: 'Aug' }, { num: 9, name: 'Sep' },
    { num: 10, name: 'Oct' }, { num: 11, name: 'Nov' }, { num: 12, name: 'Dec' },
  ];

  const filteredEvents = JAPAN_EVENTS.filter(event => {
    const matchesMonth = selectedMonth === 'all' || event.month === selectedMonth;
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block p-3 rounded-full bg-rose-100 text-rose-500 mb-4">
            <Calendar className="w-8 h-8" />
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t.title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-4">
           <div className="relative w-full md:w-auto flex-1">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input 
                type="text" 
                placeholder={tCommon.find + "..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
             />
           </div>
           
           <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              <button
                onClick={() => setSelectedMonth('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedMonth === 'all' 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.filterAll}
              </button>
              {months.map(m => (
                <button
                  key={m.num}
                  onClick={() => setSelectedMonth(m.num)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedMonth === m.num 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m.name}
                </button>
              ))}
           </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col h-full group">
               <div className="relative h-48 overflow-hidden">
                 <img 
                    src={event.imageUrl} 
                    alt={event.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-sm font-bold text-rose-600 shadow-sm">
                   {event.date}
                 </div>
               </div>
               <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{event.name}</h3>
                  <span className="text-sm font-serif text-slate-400 mb-3 block">{event.japaneseName}</span>
                  
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1.5 text-rose-400" />
                    {event.location}
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">
                    {event.description}
                  </p>
               </div>
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
           <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
             <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
             <p className="text-slate-500">No events found for this filter.</p>
           </div>
        )}
      </div>
    </div>
  );
};
