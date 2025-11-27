import React, { useState } from 'react';
import { DESTINATIONS } from '../constants';
import { DestinationCard } from '../components/DestinationCard';

export const Explore: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'culture', 'nature', 'city', 'food'];

  const filteredDestinations = filter === 'all' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.category === filter);

  return (
    <div className="pt-20 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Explore Japan</h1>
          <p className="text-slate-600 max-w-2xl">
            From the neon lights of Tokyo to the tranquil temples of Kyoto. Find your next adventure.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                filter === cat 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-200' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No destinations found in this category.
          </div>
        )}
      </div>
    </div>
  );
};