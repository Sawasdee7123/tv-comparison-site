'use client';

export default function ValueMetricsExplanation() {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Understanding Our Value Metrics</h2>

      <div className="max-w-2xl mx-auto">
        {/* Price Per Inch */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">📏</span>
            <h3 className="text-xl font-semibold text-primary-400">Price Per Inch</h3>
          </div>
          <p className="text-gray-300 mb-3">
            The <strong>Price Per Inch</strong> metric shows you how much you are paying for each inch of screen real estate. It is calculated as:
          </p>
          <div className="bg-gray-900 p-3 rounded-lg font-mono text-sm mb-3">
            Price Per Inch = Current Price ÷ Screen Size (inches)
          </div>
          <p className="text-gray-300">
            <strong>Why it matters:</strong> A lower price per inch means you are getting more screen for your money. This is particularly valuable when comparing TVs of different sizes or brands where larger screens often have a better value proposition.
          </p>
          <div className="mt-4 p-3 bg-primary-900/30 border border-primary-700 rounded-lg">
            <p className="text-primary-200 text-sm">
              💡 <strong>Pro tip:</strong> Same price per inch across sizes often indicates consistent pricing strategy from a brand. Look for outliers—they might represent great deals or overpriced models.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Other Important Specs</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <span className="font-bold text-white">Peak HDR Brightness:</span> Higher is better for HDR content and well-lit rooms.
          </div>
          <div>
            <span className="font-bold text-white">Panel Type:</span> OLED (better contrast, response) vs QLED/Mini-LED (brighter, no burn-in).
          </div>
          <div>
            <span className="font-bold text-white">Refresh Rate:</span> Higher native refresh (120Hz/144Hz) means smoother motion.
          </div>
        </div>
      </div>
    </div>
  );
}