import { NextRequest, NextResponse } from 'next/server';
import { getAllTVs } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minSize = searchParams.get('minSize');
    const maxSize = searchParams.get('maxSize');
    const panelType = searchParams.get('panelType');

    let tvs = await getAllTVs();

    // Apply filters if provided
    if (brand) {
      tvs = tvs.filter(tv => tv.brand.toLowerCase() === brand.toLowerCase());
    }
    if (minPrice) {
      tvs = tvs.filter(tv => tv.current_price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      tvs = tvs.filter(tv => tv.current_price <= parseFloat(maxPrice));
    }
    if (minSize) {
      tvs = tvs.filter(tv => tv.screen_size >= parseFloat(minSize));
    }
    if (maxSize) {
      tvs = tvs.filter(tv => tv.screen_size <= parseFloat(maxSize));
    }
    if (panelType) {
      tvs = tvs.filter(tv => tv.panel_type.toLowerCase() === panelType.toLowerCase());
    }

    return NextResponse.json(tvs, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TVs' },
      { status: 500 }
    );
  }
}
