import Link from 'next/link';
import { Navigation, ComparisonTable } from '@/app/components';
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

export default async function ComparePage() {
  const rawTVs = await getAllTVs();
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