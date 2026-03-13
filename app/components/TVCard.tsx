'use client';

import Link from 'next/link';
import { TVWithMetrics } from '@/lib/types';
import BuyNowButton from './BuyNowButton';

interface TVCardProps {
  tv: TVWithMetrics;
}

export default function TVCard({ tv }: TVCardProps) {
  // Get panel type color
  const getPanelColor = (type: string) => {
    switch (type) {
      case 'OLED': return 'from-purple-500 to-pink-500';
      case 'Mini-LED': return 'from-blue-500 to-cyan-500';
      case 'QLED': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <Link href={`/tv/${tv.id}`} className="block group">
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1 border border-gray-700/50 hover:border-gray-600">
        {/* Header with gradient based on panel type */}
        <div className={`h-2 bg-gradient-to-r ${getPanelColor(tv.panel_type)}`}></div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="font-bold text-white text-lg group-hover:text-primary-400 transition-colors">{tv.brand}</div>
              <div className="text-sm text-gray-400 line-clamp-1">{tv.model}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">${tv.current_price.toLocaleString()}</div>
              {tv.msrp > tv.current_price && (
                <div className="text-xs text-green-400">
                  Save ${(tv.msrp - tv.current_price).toLocaleString()}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm mb-4">
            <div className="bg-gray-900/50 rounded-lg p-2 text-center">
              <div className="text-gray-400 text-xs mb-1">Size</div>
              <div className="text-white font-semibold">{tv.screen_size}"</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-2 text-center">
              <div className="text-gray-400 text-xs mb-1">Panel</div>
              <div className="text-white font-semibold text-xs">{tv.panel_type}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-2 text-center">
              <div className="text-gray-400 text-xs mb-1">Refresh</div>
              <div className="text-white font-semibold">{tv.native_refresh_rate}Hz</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
            <div>
              <span className="text-xs text-gray-400">Price per inch</span>
              <div className="text-xl font-bold text-primary-400">${tv.price_per_inch.toFixed(2)}</div>
            </div>
            <BuyNowButton tv={tv} variant="small" />
          </div>
        </div>
      </div>
    </Link>
  );
}