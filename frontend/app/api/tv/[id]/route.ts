import { NextRequest, NextResponse } from 'next/server';
import { getTVById } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tv = await getTVById(id);

    if (!tv) {
      return NextResponse.json(
        { error: 'TV not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tv, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TV' },
      { status: 500 }
    );
  }
}
