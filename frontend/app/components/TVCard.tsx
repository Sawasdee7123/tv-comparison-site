'use client';

import Link from 'next/link';
import { TVWithMetrics } from '@/lib/types';

interface TVCardProps {
  tv: TVWithMetrics;
}

export default function TVCard({ tv }: TVCardProps) {
  return (
    <Link href={`/tv/${tv.id}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-750 transition-all hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="font-bold text-white text-lg">{tv.brand}</div>
            <div className="text-sm text-gray-400">{tv.model}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-400">${tv.current_price.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-400 text-xs">Size</div>
            <div className="text-white font-medium">{tv.screen_size}"</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Panel</div>
            <div className="text-white font-medium">{tv.panel_type}</div>
          </div>
        </div>

        <div className="mt-3">
          <span className="text-xs text-gray-400">Price/Inch</span>
          <span className="text-lg font-bold text-primary-400">${tv.price_per_inch.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}