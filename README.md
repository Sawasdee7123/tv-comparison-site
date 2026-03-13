# TV Comparison Site

A modern, performant TV comparison website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- Compare TVs by price-per-inch, gaming performance, and key specs
- Filter by brand, panel type, size, and price
- Detailed TV pages with comprehensive specifications
- Gaming score calculation based on input lag, HDMI 2.1 ports, VRR, ALLM, and 4K 120Hz support
- Responsive design with dark theme
- Static generation for fast loads
- API routes for dynamic data fetching
- Easy data management via Supabase

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   ├── tvs/route.ts      # GET all TVs (with filtering)
│   │   └── tv/[id]/route.ts  # GET single TV by ID
│   ├── components/           # Reusable UI components
│   ├── tv/[id]/page.tsx     # TV detail page (client component)
│   ├── page.tsx             # Homepage (server component)
│   └── layout.tsx
├── lib/
│   ├── supabase.ts          # Supabase client and data fetching functions
│   ├── dataUtils.ts         # Data utilities and metric calculations
│   └── types.ts             # TypeScript interfaces
├── data/
│   └── seed_data.json       # Initial TV data (32 TVs from RTINGS.com)
├── supabase/
│   └── schema.sql           # Database schema
└── public/                  # Static assets (if any)
```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- Git installed
- Supabase account (free tier)
- GitHub account
- Vercel account (free)

### 2. Create GitHub Repository

**Manual steps** (since automated creation requires authentication):

1. Go to https://github.com/new
2. Repository name: `comparison-site-tv`
3. Choose Public (or Private)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"
6. Follow instructions to push an existing repository:

```bash
cd frontend
git remote add origin https://github.com/your-username/comparison-site-tv.git
git branch -M main
git push -u origin main
```

### 3. Set Up Supabase

1. Sign up at https://supabase.com (free tier)
2. Create a new project:
   - Name: `tv-comparison-site`
   - Database Password: (choose a strong password)
   - Region: Choose closest to your audience
   - Plan: Free tier

3. Run database schema:
   - Go to your project's SQL Editor
   - Click "New Query"
   - Copy and paste contents of `frontend/supabase/schema.sql`
   - Click "Run" to create the `tvs` table

4. Import seed data (option A: via SQL):
   - In SQL Editor, create a new query
   - Use the following to insert data from JSON (you'll need to format the JSON as SQL inserts):
   ```sql
   -- For each TV in seed_data.json, create an INSERT statement
   -- OR use the Supabase Table Editor to manually add rows
   ```

   **Option B (Recommended)**: Use the Supabase UI:
   - Go to Table Editor
   - Click "Insert" and add each TV manually or via CSV import
   - Ensure `id` is left empty (auto-generated)
   - Map all fields from the JSON

5. Get your credentials:
   - Go to Project Settings → API
   - Copy `URL` and `anon public` key
   - These are your Supabase credentials

### 4. Configure Environment Variables

1. In the `frontend` directory, copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # For local dev; change for prod
```

3. For production (Vercel), add these same environment variables in Vercel project settings.

### 5. Expand TV Data (Manual Curation)

The current seed data has 32 TVs. The project goal is 50-60 TVs.

**How to add more TVs:**

1. Research TVs on RTINGS.com or other reputable sources
2. Add new TV objects to `data/seed_data.json` following the existing structure
3. Maintain data source attribution in `data_source` and `source_url` fields
4. Test locally with `npm run dev`

**Important:** Keep the JSON format valid. Each TV must have all required fields.

### 6. Install Dependencies

```bash
cd frontend
npm install
```

### 7. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 8. Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build.

### 9. Deploy to Vercel

1. Push your code to GitHub (if not already):
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repository (`comparison-site-tv`)
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend` (if your repo has separate frontend folder)
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
5. Add Environment Variables in Vercel (same as your `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_BASE_URL` (set to your Vercel URL, e.g., `https://your-app.vercel.app`)
6. Click "Deploy"

Your site will be live at `https://your-app.vercel.app`.

### 10. Post-Deployment

- Verify API routes work:
  - https://your-app.vercel.app/api/tvs
  - https://your-app.vercel.app/api/tv/[id]
- Check that TV listings and detail pages load correctly
- Update `NEXT_PUBLIC_BASE_URL` in Vercel environment variables to your actual domain

## API Reference

### GET /api/tvs

Returns all TVs, with optional query parameters for filtering.

**Query Parameters:**
- `brand` (string): Filter by brand (case-insensitive)
- `minPrice` (number): Minimum current price
- `maxPrice` (number): Maximum current price
- `minSize` (number): Minimum screen size in inches
- `maxSize` (number): Maximum screen size in inches
- `panelType` (string): Filter by panel type (e.g., "OLED", "QLED")

**Example:**
```
/api/tvs?brand=Samsung&minPrice=1000&maxSize=65
```

### GET /api/tv/[id]

Returns a single TV by its UUID or string ID.

**Example:**
```
/api/tv/123e4567-e89b-12d3-a456-426614174000
```

## Data Model

See `lib/types.ts` for full TypeScript interface. Key fields:

- `brand`: TV manufacturer (Samsung, LG, Sony, etc.)
- `model`: Model number
- `screen_size`: Diagonal inches
- `panel_type`: OLED, QLED, LED, etc.
- `current_price`: Current price in USD
- `price_per_inch`: Calculated metric
- `gaming_score`: Calculated 0-100 score based on gaming specs
- Gaming fields: `input_lag_ms`, `hdmi_2_1_ports`, `supports_vrr`, `supports_allm`, `supports_4k_120hz`

## Static Data Approach

- **No scrapers**: Data is manually curated from RTINGS.com
- **Manual updates**: Add TVs via Supabase Table Editor or direct SQL
- **Attribution**: Each TV includes `data_source` and `source_url` fields
- **Fallback**: API routes fall back to local JSON if Supabase is unavailable

## Development Notes

- Server components fetch data from API routes at build/request time
- Client-side error handling with localStorage caching possible
- Pages are optimized with proper caching headers (1 hour revalidation)
- Type safety enforced with TypeScript interfaces

## Future Enhancements

- Admin interface for data management (protected by Supabase auth)
- Price history tracking
- Advanced filtering (HDR formats, smart platform, etc.)
- Comparison list favorites
- User reviews and ratings
- Email alerts for price drops

## License

MIT

## Credits

Data sourced from [RTINGS.com](https://www.rtings.com). Please attribute appropriately.
