import { Navigation } from '@/app/components';

export const metadata = {
  title: 'About - TV Comparison Site',
  description: 'Learn about our TV comparison methodology and value metrics.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-8">About TV Comparison Site</h1>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg mb-4">
              Finding the right TV is overwhelming. With dozens of brands, hundreds of models, and technical specs that don&apos;t always tell the full story, it&apos;s easy to overpay or miss out on great value.
            </p>
            <p className="text-gray-300 text-lg">
              We cut through the noise by focusing on what matters: <strong>price per inch</strong> and <strong>gaming performance</strong>. Our tools help you compare apples to apples and make informed decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Why Price Per Inch?</h2>
            <p className="text-gray-300 mb-4">
              Screen size is one of the most important factors in TV value. A 65&quot; TV for $1,000 offers dramatically more viewing area than a 55&quot; TV for $800, but comparing raw prices hides this.
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Price per inch</strong> normalizes the value equation. It tells you exactly how much you&apos;re paying for each square inch of screen. Lower is better.
            </p>
            <div className="bg-gray-800 rounded-lg p-6 my-6">
              <div className="text-gray-400 mb-2">Example</div>
              <div className="text-white font-mono text-lg">
                TV A: 55&quot; at $800 = $14.55/inch<br />
                TV B: 65&quot; at $1,000 = $15.38/inch
              </div>
              <p className="text-gray-300 mt-4">
                Despite TV B costing $200 more, it actually offers <strong>better value</strong> per inch of screen.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Gaming Score Explained</h2>
            <p className="text-gray-300 mb-4">
              For gamers, specs matter in a specific way. Input lag, HDMI 2.1 ports, VRR, and 120Hz support directly impact your experience.
            </p>
            <p className="text-gray-300 mb-4">
              We built the <strong>Gaming Score</strong> (0-100) to weight these factors:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
              <li><strong>Input Lag (max 50 pts):</strong> Lower is better. 0ms = 50 points, scaling down linearly.</li>
              <li><strong>HDMI 2.1 Ports (max 30 pts):</strong> 10 points per port, up to 4 ports.</li>
              <li><strong>VRR Support (15 pts):</strong> Variable Refresh Rate prevents tearing.</li>
              <li><strong>ALLM Support (10 pts):</strong> Auto Low Latency Mode for game mode.</li>
              <li><strong>4K 120Hz (15 pts):</strong> Essential for next-gen console gaming.</li>
            </ul>
            <p className="text-gray-300">
              <strong>Target Score:</strong> 80+ for optimal next-gen gaming, 60-80 for good gaming, below 60 indicates significant compromises.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Data Sources</h2>
            <p className="text-gray-300 mb-4">
              All TV specifications and pricing data are sourced from <strong>RTINGS.com</strong>, a trusted independent review site. We regularly sync with their database to ensure accuracy.
            </p>
            <p className="text-gray-300">
              Pricing is current as of our last data update. We recommend clicking through to the source to verify live pricing and availability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Privacy & Transparency</h2>
            <p className="text-gray-300 mb-4">
              This is a free comparison tool. We don&apos;t track users, sell data, or display ads. Our goal is pure utility.
            </p>
            <p className="text-gray-300">
              If you purchase through links on this site, we may earn a commission from retailers at no extra cost to you. This helps support the project.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 TV Comparison Site
          </p>
        </div>
      </div>
    </div>
  );
}