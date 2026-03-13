export interface TV {
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
  peak_hdr_brightness: number;
  hdr_formats: string;
  local_dimming_zones: number;
  color_gamut_dci_p3: number;
  native_refresh_rate: number;
  input_lag_ms: number;
  hdmi_2_1_ports: number;
  supports_vrr: boolean;
  supports_allm: boolean;
  supports_4k_120hz: boolean;
  smart_platform: string;
  has_earc: boolean;
  wifi_standard: string;
  weight_kg: number;
  vesa_pattern: string;
  dimensions_stand: string;
  dimensions_no_stand: string;
  data_source: string;
  source_url: string;
  // Affiliate links
  affiliate_amazon?: string;
  affiliate_bestbuy?: string;
  affiliate_walmart?: string;
  affiliate_target?: string;
}

export interface TVWithMetrics extends TV {
  price_per_inch: number;
}