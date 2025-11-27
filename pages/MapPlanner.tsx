import React, { useState } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, MessageRole, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../constants';
import { MapPin, Navigation, Search, Train, Coffee, Landmark, ShoppingBag, ArrowRight, Loader2, Compass } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MapPlannerProps {
  language: LanguageCode;
}

export const MapPlanner: React.FC<MapPlannerProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'nearby' | 'route'>('nearby');
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Route inputs
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  // Results
  const [result, setResult] = useState<{ text: string; links: any[] } | null>(null);

  const t = UI_TRANSLATIONS[language].map;

  const handleLocate = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setOrigin("My Location"); // Auto-fill origin for route
          setIsLocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUserLocation(t.unknown);
          setIsLocating(false);
        }
      );
    } else {
      setUserLocation(t.unknown);
      setIsLocating(false);
    }
  };

  const handleExplore = async (category: string) => {
    setIsLoading(true);
    setResult(null);
    
    let prompt = "";
    if (userLocation && userLocation !== t.unknown) {
        prompt = `I am at coordinates ${userLocation}. List 3-4 best ${category} spots strictly near me. Include walking distance estimates.`;
    } else {
        prompt = `I am in Tokyo (default). List 3-4 best ${category} spots.`;
    }

    const response = await sendMessageToGemini([], prompt, language);
    setResult({ text: response.text, links: response.groundingLinks || [] });
    setIsLoading(false);
  };

  const handleRoute = async () => {
    if (!origin || !destination) return;
    setIsLoading(true);
    setResult(null);

    const prompt = `Plan a detailed route from ${origin === "My Location" && userLocation ? userLocation : origin} to ${destination} using public transport in Japan. Include train lines, costs, and time.`;
    
    const response = await sendMessageToGemini([], prompt, language);
    setResult({ text: response.text, links: response.groundingLinks || [] });
    setIsLoading(false);
  };

  return (
    <div className="pt-20 pb-24 min-h-screen bg-slate-50 flex flex-col">
       {/* Map Placeholder Header */}
       <div className="h-48 md:h-64 bg-slate-200 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{ 
              backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', 
              backgroundSize: '24px 24px' 
            }}>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 text-center max-w-md mx-4">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                   <Compass className="w-6 h-6 text-rose-500" />
                   {t.title}
                </h1>
                <p className="text-sm text-slate-500 mt-1">AI-Powered Navigation Assistant</p>
                
                <button 
                  onClick={handleLocate}
                  disabled={isLocating}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-70"
                >
                  {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                  {isLocating ? t.locating : (userLocation && userLocation !== t.unknown ? "Updated" : t.locate)}
                </button>
                {userLocation && (
                  <div className="text-[10px] text-slate-400 mt-2 font-mono">{userLocation}</div>
                )}
             </div>
          </div>
       </div>

       <div className="max-w-4xl w-full mx-auto px-4 -mt-8 relative z-10 flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1 mb-6">
             <button 
               onClick={() => { setActiveTab('nearby'); setResult(null); }}
               className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                 activeTab === 'nearby' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
               }`}
             >
               <MapPin className="w-4 h-4" />
               {t.nearby}
             </button>
             <button 
               onClick={() => { setActiveTab('route'); setResult(null); }}
               className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                 activeTab === 'route' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
               }`}
             >
               <Train className="w-4 h-4" />
               {t.route}
             </button>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 min-h-[400px]">
             
             {activeTab === 'nearby' && (
               <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'Food', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-50' },
                      { id: 'Attractions', icon: Landmark, color: 'text-rose-500', bg: 'bg-rose-50' },
                      { id: 'Shopping', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { id: 'Stations', icon: Train, color: 'text-green-500', bg: 'bg-green-50' },
                    ].map((cat) => (
                       <button
                         key={cat.id}
                         onClick={() => handleExplore(cat.id)}
                         className={`${cat.bg} p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform border border-transparent hover:border-slate-200`}
                       >
                         <cat.icon className={`w-8 h-8 ${cat.color}`} />
                         <span className="text-xs font-bold text-slate-700">{cat.id}</span>
                       </button>
                    ))}
                  </div>
                  {!result && !isLoading && (
                    <div className="text-center text-slate-400 py-10 text-sm">
                      Select a category to find places near you.
                    </div>
                  )}
               </div>
             )}

             {activeTab === 'route' && (
               <div className="space-y-4">
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <div className="flex items-center gap-3">
                        <div className="w-8 flex justify-center"><div className="w-3 h-3 rounded-full border-2 border-slate-400"></div></div>
                        <input 
                          type="text" 
                          placeholder={t.from}
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 flex justify-center text-slate-300">
                          <div className="h-8 border-l-2 border-dotted border-slate-300"></div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 flex justify-center"><MapPin className="w-4 h-4 text-rose-500" /></div>
                        <input 
                          type="text" 
                          placeholder={t.to}
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                     </div>
                     <button 
                       onClick={handleRoute}
                       disabled={isLoading || !origin || !destination}
                       className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                     >
                       {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                       {t.plan}
                     </button>
                  </div>
                  {!result && !isLoading && (
                    <div className="text-center text-slate-400 py-10 text-sm">
                      Enter locations to get detailed transit directions.
                    </div>
                  )}
               </div>
             )}

             {/* Results Display */}
             {isLoading && (
               <div className="py-12 flex flex-col items-center justify-center text-slate-400 animate-pulse">
                  <Compass className="w-12 h-12 mb-4 text-slate-200" />
                  <p>Consulting the guide...</p>
               </div>
             )}

             {result && (
               <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4">
                  <div className="prose prose-sm prose-slate max-w-none">
                    <ReactMarkdown>{result.text}</ReactMarkdown>
                  </div>
                  {result.links && result.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                       {result.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
                          >
                             <MapPin className="w-3 h-3" />
                             {link.title}
                          </a>
                       ))}
                    </div>
                  )}
               </div>
             )}
          </div>
       </div>
    </div>
  );
};
