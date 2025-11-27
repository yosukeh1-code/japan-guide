import React from 'react';
import { Destination } from '../types';
import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 uppercase tracking-wide">
          {destination.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900">{destination.name}</h3>
          <span className="text-sm font-serif text-slate-400 mt-1">{destination.japaneseName}</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="w-3 h-3 mr-1" />
          {destination.region}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {destination.description}
        </p>
      </div>
    </div>
  );
};