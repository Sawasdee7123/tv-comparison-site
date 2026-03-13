'use client';

import { useEffect, useState } from 'react';

interface TrustBarProps {
  tvCount: number;
}

export default function TrustBar({ tvCount }: TrustBarProps) {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = tvCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= tvCount) {
        setAnimatedCount(tvCount);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [tvCount]);

  const stats = [
    { icon: '📺', value: `${animatedCount}+`, label: 'TVs Compared', color: 'from-blue-500 to-cyan-500' },
    { icon: '🏷️', value: '7', label: 'Top Brands', color: 'from-purple-500 to-pink-500' },
    { icon: '⚡', value: 'Daily', label: 'Price Updates', color: 'from-orange-500 to-red-500' },
    { icon: '✓', value: '100%', label: 'Data Verified', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border-y border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
