import React from 'react';

interface HeroSectionProps {
  onStartGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartGuide }) => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" 
          alt="Mt Fuji and Cherry Blossoms" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="inline-block py-1 px-4 rounded-full bg-rose-500/80 text-white text-sm font-semibold mb-6 border border-rose-400/50 backdrop-blur-md shadow-lg">
          Discover Japan with AI 🗻🌸🍣
        </span>
        <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          JAPAN GUIDE
        </h1>
        <p className="text-lg md:text-2xl text-slate-100 max-w-2xl mb-10 leading-relaxed font-medium drop-shadow-md">
          Your personal intelligent guide to the Land of the Rising Sun. 
          Discover hidden gems, navigate complex trains, and enjoy the best sushi.
        </p>
        <button 
          onClick={onStartGuide}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-rose-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-500/40"
        >
          Ask the Guide
          <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};