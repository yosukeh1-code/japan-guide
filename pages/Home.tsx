import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { DESTINATIONS } from '../constants';
import { DestinationCard } from '../components/DestinationCard';
import { PageView } from '../types';

interface HomeProps {
  navigate: (page: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  const featuredDestinations = DESTINATIONS.slice(0, 3);

  return (
    <div className="pb-24">
      <HeroSection onStartGuide={() => navigate(PageView.GUIDE)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Popular Destinations</h2>
            <p className="text-slate-500 mt-2">Curated locations you must visit</p>
          </div>
          <button 
            onClick={() => navigate(PageView.EXPLORE)}
            className="text-rose-500 font-medium hover:text-rose-600 transition-colors flex items-center"
          >
            View all <span className="ml-1">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between">
              {/* Decorative Circle */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
              
              <div className="relative z-10 max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need help with trains or translation?</h2>
                <p className="text-indigo-200 text-lg mb-6 md:mb-0">
                  Our AI guide is trained on Japan's intricate transportation system and cultural etiquette. Ask anything!
                </p>
              </div>
              
              <div className="relative z-10 mt-6 md:mt-0 flex gap-4 flex-col sm:flex-row">
                 <button 
                   onClick={() => navigate(PageView.MAP)}
                   className="bg-indigo-800 border border-indigo-700 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors"
                >
                  Plan Route
                </button>
                <button 
                   onClick={() => navigate(PageView.GUIDE)}
                   className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  Start Chatting
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
