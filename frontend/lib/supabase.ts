import { createClient } from '@supabase/supabase-js';

// Use server-side env vars if available (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
// Fallback to public env vars for compatibility ( NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY )
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type TV = {
  id: string;
  brand: string;
  model: string;
  series: string;
  model_year: number;
  screen_size: number;
  panel_type: string;
  resolution: string;
  msrp: number;
  current_price: number;
  availability: string;
  peak_hdr_brightness: number | null;
  hdr_formats: string | null;
  local_dimming_zones: number | null;
  color_gamut_dci_p3: number | null;
  native_refresh_rate: number;
  input_lag_ms: number | null;
  hdmi_2_1_ports: number;
  supports_vrr: boolean;
  supports_allm: boolean;
  supports_4k_120hz: boolean;
  smart_platform: string | null;
  has_earc: boolean;
  wifi_standard: string | null;
  weight_kg: number | null;
  vesa_pattern: string | null;
  dimensions_stand: string | null;
  dimensions_no_stand: string | null;
  data_source: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function getAllTVs(): Promise<TV[]> {
  // If no Supabase configured, fallback to local JSON
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured, falling back to local JSON');
    const data = await import('../data/seed_data.json');
    return data.default.map((item: any, index: number) => ({
      ...item,
      id: `tv-${index + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })) as TV[];
  }

  const { data, error } = await supabase
    .from('tvs')
    .select('*')
    .order('brand', { ascending: true })
    .order('model_year', { ascending: false });

  if (error) {
    console.error('Error fetching TVs from Supabase:', error);
    throw error;
  }

  return data || [];
}

export async function getTVById(id: string): Promise<TV | null> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase not configured, falling back to local JSON');
    const data = await import('../data/seed_data.json');
    const allTVs = data.default.map((item: any, index: number) => ({
      ...item,
      id: `tv-${index + 1}`,
    }));
    return allTVs.find(tv => tv.id === id) || null;
  }

  const { data, error } = await supabase
    .from('tvs')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching TV from Supabase:', error);
    throw error;
  }

  return data || null;
}
