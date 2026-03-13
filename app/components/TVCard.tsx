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
            <div className="text-xs text-gray-400">MSRP: ${tv.msrp.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
          <div>
            <div className="text-gray-400 text-xs">Size</div>
            <div className="text-white font-medium">{tv.screen_size}"</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Panel</div>
            <div className="text-white font-medium">{tv.panel_type}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">Brightness</div>
            <div className="text-white font-medium">{tv.peak_hdr_brightness} nits</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-700">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Price/Inch</span>
            <span className="text-lg font-bold text-primary-400">${tv.price_per_inch.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">Gaming Score</span>
            <span className={`text-lg font-bold ${tv.gaming_score >= 80 ? 'text-green-400' : tv.gaming_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {tv.gaming_score}/100
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {tv.supports_vrr && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">VRR</span>
          )}
          {tv.hdmi_2_1_ports >= 4 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900 text-blue-300">4× HDMI 2.1</span>
          )}
          {tv.input_lag_ms <= 10 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-900 text-purple-300">Low Lag</span>
          )}
        </div>
      </div>
    </Link>
  );
}