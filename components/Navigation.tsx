import React from 'react';
import { PageView, LanguageCode } from '../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../constants';
import { Home, Compass, MessageCircle, MapPin, Calendar, Globe } from 'lucide-react';

interface NavigationProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onNavigate,
  currentLanguage,
  onLanguageChange
}) => {
  const t = UI_TRANSLATIONS[currentLanguage].nav;

  const navItems = [
    { id: PageView.HOME, label: t.home, icon: Home },
    { id: PageView.EXPLORE, label: t.explore, icon: Compass },
    { id: PageView.MAP, label: t.map, icon: MapPin },
    { id: PageView.EVENTS, label: t.events, icon: Calendar },
    { id: PageView.GUIDE, label: t.guide, icon: MessageCircle },
  ];

  return (
    <>
      {/* Desktop Navigation (Top) */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 px-8 py-4 justify-between items-center">
        <div className="flex items-center gap-2 text-rose-500 font-bold text-xl cursor-pointer" onClick={() => onNavigate(PageView.HOME)}>
          <img src="https://flagcdn.com/jp.svg" alt="Japan Flag" className="w-6 h-4 rounded-sm shadow-sm" />
          <span>NihonGo</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  currentPage === item.id ? 'text-rose-500' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Language Selector Desktop */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 transition-all">
              <Globe className="w-4 h-4" />
              <span>{LANGUAGES.find(l => l.code === currentLanguage)?.label}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-slate-100 py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center justify-between ${
                    currentLanguage === lang.code ? 'text-rose-500 font-medium' : 'text-slate-600'
                  }`}
                >
                  {lang.label}
                  <span className="text-xs">{lang.flag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation (Bottom) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
                currentPage === item.id ? 'text-rose-500' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Language Selector (Floating) */}
      <div className="md:hidden fixed top-4 right-4 z-50">
         <select 
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
            className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none pr-8 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.7rem top 50%',
              backgroundSize: '0.65rem auto'
            }}
         >
           {LANGUAGES.map(l => (
             <option key={l.code} value={l.code}>{l.flag} {l.code.toUpperCase()}</option>
           ))}
         </select>
      </div>
    </>
  );
};
