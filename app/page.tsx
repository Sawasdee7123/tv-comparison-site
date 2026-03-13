import Link from 'next/link';
import { Navigation, ComparisonTable, TVCard, ValueMetricsExplanation, TrustBar } from '@/app/components';
import QuickFiltersWrapper from '@/app/components/QuickFiltersWrapper';
import { getAllTVs } from '@/lib/supabase';
import { TVWithMetrics } from '@/lib/types';

// Disable static generation for this page - always fetch fresh data
export const dynamic = 'force-dynamic';

function calculateMetrics(tvs: { current_price: number; screen_size: number }[]): TVWithMetrics[] {
  return tvs.map(tv => ({
    ...tv,
    price_per_inch: tv.current_price / tv.screen_size,
  })) as TVWithMetrics[];
}

export default async function Home() {
  const rawTVs = await getAllTVs();
  const tvs = calculateMetrics(rawTVs);

  // Get featured TVs - best value (lowest price per inch)
  const featuredByValue = [...tvs].sort((a, b) => a.price_per_inch - b.price_per_inch).slice(0, 3);

  // Get trending (most expensive - simulating popularity)
  const trendingTVs = [...tvs].sort((a, b) => b.current_price - a.current_price).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <Navigation />

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-gray-900 to-purple-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Live Price Comparison
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your{' '}
            <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Perfect TV
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Compare <strong className="text-white">{tvs.length}+ TVs</strong> by price-per-inch. 
            Stop overpaying for screen size.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#compare" 
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105"
            >
              Start Comparing →
            </a>
            <Link 
              href="/about" 
              className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar tvCount={tvs.length} />

      {/* Quick Filters */}
      <QuickFiltersWrapper />

      {/* Featured by Value */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">🏆 Best Value Picks</h2>
              <p className="text-gray-400">Lowest price per inch — maximum screen for your money</p>
            </div>
            <Link 
              href="/compare" 
              className="hidden sm:block text-primary-400 hover:text-primary-300 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredByValue.map((tv, index) => (
              <div key={tv.id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full z-10">
                    #1 Best Value
                  </div>
                )}
                <TVCard tv={tv} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending / Premium Section */}
      <section className="py-12 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">🔥 Premium Picks</h2>
              <p className="text-gray-400">Top-tier TVs for the ultimate experience</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingTVs.map((tv) => (
              <TVCard key={tv.id} tv={tv} />
            ))}
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section id="compare" className="py-16 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Compare All TVs
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Filter by brand, panel type, size, or price. Click column headers to sort. 
              Price per inch is highlighted for easy comparison.
            </p>
          </div>
          <ComparisonTable tvs={tvs} limit={10} />
        </div>
      </section>

      {/* Value Metrics Explanation */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ValueMetricsExplanation />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-purple-900/50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to find your perfect TV?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of smart shoppers who use our price-per-inch metric to save money.
          </p>
          <a 
            href="#compare" 
            className="inline-block px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start Comparing Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📺</span>
                <span className="text-xl font-bold text-white">TVCompare</span>
              </div>
              <p className="text-gray-400 text-sm">
                Helping you find the best value TV with our price-per-inch comparison tool.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/compare" className="text-gray-400 hover:text-white transition-colors">Compare All</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.rtings.com" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">RTINGS.com</a></li>
                <li><span className="text-gray-500">Buying Guide (Coming Soon)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Data</h4>
              <p className="text-gray-400 text-sm">
                All specifications sourced from RTINGS.com. Prices updated daily.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2025 TVCompare. Built with Next.js, TypeScript, and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}