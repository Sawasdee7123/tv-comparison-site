import { Navigation, ComparisonTable, TVCard, ValueMetricsExplanation } from '@/app/components';
import { calculateMetrics } from '@/lib/dataUtils';
import { TVWithMetrics } from '@/lib/types';

export default function Home() {
  const tvs = calculateMetrics();

  // Get featured TVs - best value (lowest price per inch) and best gaming (highest gaming score)
  const featuredByValue = [...tvs].sort((a, b) => a.price_per_inch - b.price_per_inch).slice(0, 3);
  const featuredByGaming = [...tvs].sort((a, b) => b.gaming_score - a.gaming_score).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect
            <span className="block text-primary-400">TV Value</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Compare TVs by price-per-inch, gaming performance, and key specs. Make an informed decision with our comprehensive comparison tool.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-gray-800 px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold text-primary-400">{tvs.length}+</div>
              <div className="text-sm text-gray-400">TVs Compared</div>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold text-green-400">28+</div>
              <div className="text-sm text-gray-400">Specs Analyzed</div>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400">Real-time</div>
              <div className="text-sm text-gray-400">Price Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured by Value */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            🏆 Best Value Picks (Lowest Price Per Inch)
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredByValue.map((tv) => (
              <TVCard key={tv.id} tv={tv} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured by Gaming */}
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            🎮 Top Gaming TVs
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredByGaming.map((tv) => (
              <TVCard key={tv.id} tv={tv} />
            ))}
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Compare All TVs
          </h2>
          <p className="text-gray-400 mb-6">
            Filter by brand, panel type, size, or price. Click column headers to sort. Price per inch is highlighted for easy comparison.
          </p>
          <ComparisonTable tvs={tvs} />
        </div>
      </section>

      {/* Value Metrics Explanation */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Understanding Our Metrics
          </h2>
          <ValueMetricsExplanation />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>TV Comparison Site - Data sourced from RTINGS.com</p>
          <p className="mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}