'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/app/components';
import { calculateMetrics } from '@/lib/dataUtils';
import { TVWithMetrics } from '@/lib/types';
import { useEffect, useState } from 'react';

export async function generateStaticParams() {
  const allTVsData = calculateMetrics();
  return allTVsData.map((tv) => ({
    id: tv.id,
  }));
}

export default function TVDetailPage() {
  const params = useParams();
  const tvId = params.id as string;

  const [tv, setTV] = useState<TVWithMetrics | null>(null);
  const [allTvs, setAllTvs] = useState<TVWithMetrics[]>([]);

  useEffect(() => {
    const allTVsData = calculateMetrics();
    setAllTvs(allTVsData);
    const foundTV = allTVsData.find(t => t.id === tvId);
    setTV(foundTV || null);
  }, [tvId]);

  if (!tv) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="max-w-7xl mx-auto py-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">TV Not Found</h1>
          <p className="text-gray-400 mb-8">The TV you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Back to Comparison
          </Link>
        </div>
      </div>
    );
  }

  const similarTvs = allTvs
    .filter(t => t.brand === tv.brand && t.id !== tv.id)
    .slice(0, 3);

  const renderStat = (label: string, value: string | number | boolean, highlight?: boolean) => (
    <div className="py-3 border-b border-gray-700 last:border-0">
      <div className="text-sm text-gray-400">{label}</div>
      <div className={`text-lg font-bold ${highlight ? 'text-primary-400' : 'text-white'}`}>
        {typeof value === 'boolean' ? (value ? '✓ Yes' : '✗ No') : value}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{tv.brand} {tv.model}</span>
        </nav>

        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {tv.brand} {tv.model}
                  </h1>
                  <p className="text-gray-400">{tv.series} • {tv.model_year} • {tv.screen_size}"</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary-400">
                    ${tv.current_price.toLocaleString()}
                  </div>
                  {tv.msrp > tv.current_price && (
                    <div className="text-gray-500 line-through">${tv.msrp.toLocaleString()}</div>
                  )}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${tv.availability === 'In stock' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {tv.availability}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                  {tv.panel_type}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                  {tv.resolution}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                  {tv.native_refresh_rate}Hz Native
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Price Per Inch</div>
                  <div className="text-3xl font-bold text-primary-400">${tv.price_per_inch.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Gaming Score</div>
                  <div className={`text-3xl font-bold ${tv.gaming_score >= 80 ? 'text-green-400' : tv.gaming_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {tv.gaming_score}/100
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${tv.gaming_score >= 80 ? 'bg-green-500' : tv.gaming_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(tv.gaming_score, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Core Display Specs */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Display Specifications</h2>
            <div className="grid md:grid-cols-2 gap-x-8">
              <div>
                {renderStat('Screen Size', `${tv.screen_size} inches`)}
                {renderStat('Panel Type', tv.panel_type)}
                {renderStat('Resolution', tv.resolution)}
                {renderStat('Native Refresh Rate', `${tv.native_refresh_rate} Hz`)}
                {renderStat('Peak HDR Brightness', `${tv.peak_hdr_brightness} nits`, true)}
                {renderStat('Local Dimming Zones', tv.local_dimming_zones === 0 ? 'N/A (OLED)' : tv.local_dimming_zones)}
              </div>
              <div>
                {renderStat('Color Gamut (DCI-P3)', `${tv.color_gamut_dci_p3}%`, true)}
                {renderStat('HDR Formats', tv.hdr_formats)}
                {renderStat('Smart Platform', tv.smart_platform)}
                {renderStat('WiFi Standard', tv.wifi_standard)}
                {renderStat('Weight', `${tv.weight_kg} kg`)}
                {renderStat('VESA Pattern', tv.vesa_pattern)}
              </div>
            </div>
          </div>

          {/* Gaming Specs */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Gaming Performance</h2>
            <div className="grid md:grid-cols-2 gap-x-8">
              <div>
                {renderStat('Input Lag', `${tv.input_lag_ms} ms`, tv.input_lag_ms <= 10)}
                {renderStat('HDMI 2.1 Ports', tv.hdmi_2_1_ports, tv.hdmi_2_1_ports >= 4)}
                {renderStat('Supports VRR', tv.supports_vrr, true)}
                {renderStat('Supports ALLM', tv.supports_allm, true)}
                {renderStat('4K 120Hz Support', tv.supports_4k_120hz, true)}
                {renderStat('Has eARC', tv.has_earc)}
              </div>
              <div>
                <div className="py-3 border-b border-gray-700">
                  <div className="text-sm text-gray-400">Gaming Score Breakdown</div>
                  <div className="text-sm text-gray-300 mt-2 space-y-1">
                    <div>Input Lag: {Math.max(0, 50 - tv.input_lag_ms * 1.5)} pts</div>
                    <div>HDMI 2.1: {Math.min(tv.hdmi_2_1_ports * 10, 30)} pts</div>
                    <div>VRR: {tv.supports_vrr ? '15' : '0'} pts</div>
                    <div>ALLM: {tv.supports_allm ? '10' : '0'} pts</div>
                    <div>4K 120Hz: {tv.supports_4k_120hz ? '15' : '0'} pts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dimensions & Source */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Physical & Source Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-md font-semibold text-gray-300 mb-3">Dimensions</h3>
              {renderStat('With Stand', tv.dimensions_stand)}
              {renderStat('Without Stand', tv.dimensions_no_stand)}
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-300 mb-3">Data Source</h3>
              {renderStat('Source', tv.data_source)}
              <a
                href={tv.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 text-sm mt-2 inline-block"
              >
                View original review →
              </a>
            </div>
          </div>
        </div>

        {/* Similar TVs */}
        {similarTvs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Similar {tv.brand} TVs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarTvs.map((similarTV) => (
                <Link
                  key={similarTV.id}
                  href={`/tv/${similarTV.id}`}
                  className="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-750 transition-all"
                >
                  <div className="font-bold text-white">{similarTV.model}</div>
                  <div className="text-sm text-gray-400">{similarTV.screen_size}" • {similarTV.panel_type}</div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-400">${similarTV.current_price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400">${similarTV.price_per_inch.toFixed(2)}/inch</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Comparison */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ← Back to Full Comparison
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>Data sourced from RTINGS.com</p>
        </div>
      </footer>
    </div>
  );
}