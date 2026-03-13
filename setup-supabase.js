const { Client } = require('pg');
const fs = require('fs');

// Connect to Supabase PostgreSQL
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:EtL.3CnXxxD3P%&@db.rxyptyndfcttktdfzdrj.supabase.co:5432/postgres';

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected.');

    // Read schema.sql
    const schemaSql = fs.readFileSync('C:\\Users\\Skynet\\.openclaw\\shared\\projects\\comparison-site-tv\\frontend\\supabase\\schema.sql', 'utf8');
    console.log('Executing schema...');
    await client.query(schemaSql);
    console.log('Schema created.');

    // Read seed data
    const seedData = JSON.parse(fs.readFileSync('C:\\Users\\Skynet\\.openclaw\\shared\\projects\\comparison-site-tv\\data\\seed_data.json', 'utf8'));
    console.log(`Loaded ${seedData.length} TV records.`);

    // Insert data
    console.log('Inserting data...');
    const insertQuery = `
      INSERT INTO tvs (
        brand, model, series, model_year, screen_size, panel_type, resolution,
        msrp, current_price, availability, peak_hdr_brightness, hdr_formats,
        local_dimming_zones, color_gamut_dci_p3, native_refresh_rate,
        input_lag_ms, hdmi_2_1_ports, supports_vrr, supports_allm,
        supports_4k_120hz, smart_platform, has_earc, wifi_standard,
        weight_kg, vesa_pattern, dimensions_stand, dimensions_no_stand,
        data_source, source_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
                $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)
      ON CONFLICT (model) DO NOTHING
    `;

    for (const tv of seedData) {
      const values = [
        tv.brand, tv.model, tv.series, tv.model_year, tv.screen_size, tv.panel_type, tv.resolution,
        tv.msrp, tv.current_price, tv.availability, tv.peak_hdr_brightness, tv.hdr_formats,
        tv.local_dimming_zones, tv.color_gamut_dci_p3, tv.native_refresh_rate,
        tv.input_lag_ms, tv.hdmi_2_1_ports, tv.supports_vrr, tv.supports_allm,
        tv.supports_4k_120hz, tv.smart_platform, tv.has_earc, tv.wifi_standard,
        tv.weight_kg, tv.vesa_pattern, tv.dimensions_stand, tv.dimensions_no_stand,
        tv.data_source, tv.source_url
      ];
      await client.query(insertQuery, values);
    }
    console.log('Data inserted.');

    // Verify count
    const result = await client.query('SELECT COUNT(*) FROM tvs');
    console.log(`Total TVs in database: ${result.rows[0].count}`);

    await client.end();
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

setupDatabase();
