import { TV, TVWithMetrics } from './types';
import seedData from '../data/seed_data.json';

export function loadTVData(): TV[] {
  const data = Array.isArray(seedData) ? seedData : [];
  return data.map((item: any, index: number) => ({
    ...item,
    id: `tv-${index + 1}`,
  }));
}

export async function fetchTVs(): Promise<TV[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/tvs`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch TVs: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching TVs from API, falling back to local JSON:', error);
    // Fallback to local JSON
    return loadTVData();
  }
}

export function calculateMetrics(tvs: TV[]): TVWithMetrics[] {
  return tvs.map(tv => ({
    ...tv,
    price_per_inch: tv.current_price / tv.screen_size,
    gaming_score: calculateGamingScore(tv),
  }));
}

function calculateGamingScore(tv: TV): number {
  let score = 0;

  // Input lag component (lower is better, so we invert)
  // 0ms = 50 points, 50ms = 0 points
  const inputLag = tv.input_lag_ms ?? 50;
  score += Math.max(0, 50 - inputLag * 1.5);

  // HDMI 2.1 ports (each worth 10 points, up to 30)
  score += Math.min(tv.hdmi_2_1_ports * 10, 30);

  // VRR support (15 points)
  if (tv.supports_vrr) score += 15;

  // ALLM support (10 points)
  if (tv.supports_allm) score += 10;

  // 4K 120Hz support (15 points)
  if (tv.supports_4k_120hz) score += 15;

  return Math.round(score);
}

export function getUniqueValues(tvs: TV[], field: keyof TV): string[] {
  const values = new Set<string>();
  tvs.forEach(tv => {
    const value = tv[field];
    if (value !== null && value !== undefined) {
      values.add(String(value));
    }
  });
  return Array.from(values).sort();
}
