-- Create tvs table
CREATE TABLE IF NOT EXISTS tvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL UNIQUE,
  series TEXT,
  model_year INTEGER NOT NULL,
  screen_size INTEGER NOT NULL,
  panel_type TEXT NOT NULL,
  resolution TEXT NOT NULL DEFAULT '4K',
  msrp DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  availability TEXT DEFAULT 'In stock',
  peak_hdr_brightness INTEGER,
  hdr_formats TEXT,
  local_dimming_zones INTEGER,
  color_gamut_dci_p3 DECIMAL(5,2),
  native_refresh_rate INTEGER NOT NULL,
  input_lag_ms INTEGER,
  hdmi_2_1_ports INTEGER DEFAULT 0,
  supports_vrr BOOLEAN DEFAULT false,
  supports_allm BOOLEAN DEFAULT false,
  supports_4k_120hz BOOLEAN DEFAULT false,
  smart_platform TEXT,
  has_earc BOOLEAN DEFAULT false,
  wifi_standard TEXT,
  weight_kg DECIMAL(6,2),
  vesa_pattern TEXT,
  dimensions_stand TEXT,
  dimensions_no_stand TEXT,
  data_source TEXT NOT NULL,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_tvs_brand ON tvs(brand);
CREATE INDEX IF NOT EXISTS idx_tvs_model_year ON tvs(model_year);
CREATE INDEX IF NOT EXISTS idx_tvs_screen_size ON tvs(screen_size);
CREATE INDEX IF NOT EXISTS idx_tvs_panel_type ON tvs(panel_type);
CREATE INDEX IF NOT EXISTS idx_tvs_price ON tvs(current_price);

-- Enable Row Level Security (RLS) - optional for public read
ALTER TABLE tvs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (if needed)
CREATE POLICY "Allow public read access" ON tvs
  FOR SELECT USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tvs_updated_at
  BEFORE UPDATE ON tvs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
