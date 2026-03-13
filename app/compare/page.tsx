import Link from 'next/link';
import { Navigation, ComparisonTable } from '@/app/components';
import { fetchTVs, calculateMetrics } from '@/lib/dataUtils';
import { TVWithMetrics } from '@/lib/types';

export default async function ComparePage() {
  const rawTVs = await fetchTVs();
  const tvs = calculateMetrics(rawTVs);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Complete TV Comparison</h1>
          <Link href="/" className="text-primary-400 hover:text-primary-300 flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
        <ComparisonTable tvs={tvs} />
      </main>
    </div>
  );
}