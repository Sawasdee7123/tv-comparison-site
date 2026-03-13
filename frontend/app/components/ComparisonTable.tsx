'use client';

import { useState, useMemo } from 'react';
import { TVWithMetrics } from '@/lib/types';

interface ComparisonTableProps {
  tvs: TVWithMetrics[];
}

type SortField = 'current_price' | 'price_per_inch' | 'input_lag_ms' | 'peak_hdr_brightness' | 'brand' | 'screen_size' | 'panel_type';
type SortDirection = 'asc' | 'desc';

export default function ComparisonTable({ tvs }: ComparisonTableProps) {
  const [filters, setFilters] = useState<{
    brand: string;
    panel_type: string;
    size_range: string;
    price_range: string;
  }>({
    brand: 'all',
    panel_type: 'all',
    size_range: 'all',
    price_range: 'all',
  });

  const [sortField, setSortField] = useState<SortField>('price_per_inch');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const brands = useMemo(() => {
    const unique = new Set(tvs.map(tv => tv.brand));
    return Array.from(unique).sort();
  }, [tvs]);

  const panelTypes = useMemo(() => {
    const unique = new Set(tvs.map(tv => tv.panel_type));
    return Array.from(unique).sort();
  }, [tvs]);

  const filteredAndSortedTvs = useMemo(() => {
    let result = [...tvs];

    // Apply filters
    if (filters.brand !== 'all') {
      result = result.filter(tv => tv.brand === filters.brand);
    }
    if (filters.panel_type !== 'all') {
      result = result.filter(tv => tv.panel_type === filters.panel_type);
    }
    if (filters.size_range !== 'all') {
      const [min, max] = filters.size_range.split('-').map(Number);
      result = result.filter(tv => tv.screen_size >= min && (max ? tv.screen_size <= max : true));
    }
    if (filters.price_range !== 'all') {
      const [min, max] = filters.price_range.split('-').map(Number);
      result = result.filter(tv => tv.current_price >= min && (max ? tv.current_price <= max : true));
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return result;
  }, [tvs, filters, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700"
    >
      <div className="flex items-center gap-1">
        {label}
        {sortField === field && (
          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Panel Type</label>
            <select
              value={filters.panel_type}
              onChange={(e) => setFilters({ ...filters, panel_type: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {panelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Size (inches)</label>
            <select
              value={filters.size_range}
              onChange={(e) => setFilters({ ...filters, size_range: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Sizes</option>
              <option value="42-48">42"-48"</option>
              <option value="50-55">50"-55"</option>
              <option value="60-65">60"-65"</option>
              <option value="70-75">70"-75"</option>
              <option value="77-83">77"-83"</option>
              <option value="85-100">85"+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Price Range</label>
            <select
              value={filters.price_range}
              onChange={(e) => setFilters({ ...filters, price_range: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="0-1000">Under $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000-3000">$2,000 - $3,000</option>
              <option value="3000-5000">$3,000 - $5,000</option>
              <option value="5000-999999">$5,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900 border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Model
              </th>
              <SortHeader field="screen_size" label="Size" />
              <SortHeader field="current_price" label="Price" />
              <SortHeader field="price_per_inch" label="Price/Inch" />
              <SortHeader field="panel_type" label="Panel" />
              <SortHeader field="peak_hdr_brightness" label="Brightness" />
              <SortHeader field="input_lag_ms" label="Input Lag" />
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                HDMI 2.1
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                VRR
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Gaming Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredAndSortedTvs.map((tv) => (
              <tr key={tv.id} className="hover:bg-gray-750 transition-colors">
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-white">{tv.brand}</div>
                    <div className="text-sm text-gray-400">{tv.model}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-300">{tv.screen_size}"</td>
                <td className="px-4 py-4 font-bold text-white">${tv.current_price.toLocaleString()}</td>
                <td className="px-4 py-4">
                  <span className="font-bold text-primary-400">
                    ${tv.price_per_inch.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-300">{tv.panel_type}</td>
                <td className="px-4 py-4 text-gray-300">{tv.peak_hdr_brightness} nits</td>
                <td className="px-4 py-4">
                  <span className={`font-bold ${tv.input_lag_ms <= 10 ? 'text-green-400' : tv.input_lag_ms <= 15 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {tv.input_lag_ms}ms
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${tv.hdmi_2_1_ports >= 4 ? 'bg-green-900 text-green-300' : tv.hdmi_2_1_ports >= 2 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'}`}>
                    {tv.hdmi_2_1_ports}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  {tv.supports_vrr ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                      ✓ VRR
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
                      ✗ No VRR
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`font-bold text-lg ${tv.gaming_score >= 80 ? 'text-green-400' : tv.gaming_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {tv.gaming_score}
                    </span>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${tv.gaming_score >= 80 ? 'bg-green-500' : tv.gaming_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(tv.gaming_score, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedTvs.length === 0 && (
        <div className="p-8 text-center text-gray-400">
          No TVs match your filters. Try adjusting your criteria.
        </div>
      )}

      <div className="p-4 bg-gray-900 border-t border-gray-700 text-sm text-gray-400">
        Showing {filteredAndSortedTvs.length} of {tvs.length} TVs
      </div>
    </div>
  );
}