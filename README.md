# TV Comparison Site - Project Guide

**⚠️ IMPORTANT: All spawned agents MUST read this README first before working on this project.**

---

## Project Overview

A production-ready TV comparison website that helps users find the best value TVs using price-per-inch metrics. Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

**Live Site:** https://frontend-ten-swart-37.vercel.app  
**Status:** Active Development  
**Last Updated:** March 15, 2026

---

## Quick Reference

| Resource | URL/Location | Notes |
|----------|--------------|-------|
| **Live Site** | https://frontend-ten-swart-37.vercel.app | Production deployment |
| **GitHub Repo** | https://github.com/Sawasdee7123/tv-comparison-site | Source code |
| **Supabase Project** | https://supabase.com/dashboard/project/sxzmhlvrpfmothfjrqay | Database admin |
| **Vercel Dashboard** | https://vercel.com/marcs-projects-c6a21ede/tv-comparison-site | Deployments |
| **Frontend Code** | `./frontend/` | Next.js application |
| **Database Schema** | `./database/schema.sql` | PostgreSQL schema |

---

## Project Structure

```
comparison-site-tv/
├── frontend/                 # Next.js application
│   ├── app/                  # App Router (pages, components)
│   ├── lib/                  # Utilities, types, Supabase client
│   ├── data/                 # Seed data (deprecated - use Supabase)
│   └── supabase/             # Database schema
├── database/
│   ├── schema.sql            # Full database schema
│   └── migrations/           # Migration scripts
├── reference/                # Documentation, decisions
├── scripts/                  # Utility scripts
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

---

## Supabase Database Access

### Project Details
- **Project Name:** tv-comparison-site
- **Project ID:** `sxzmhlvrpfmothfjrqay`
- **Region:** ap-southeast-1 (Singapore)
- **Status:** ACTIVE_HEALTHY

### Access Methods

#### 1. Management API (Account-wide)
**Use for:** Schema changes, migrations, admin operations

```powershell
$env:SUPABASE_PAT = [System.Environment]::GetEnvironmentVariable("SUPABASE_PAT", "User")
$headers = @{ Authorization = "Bearer $env:SUPABASE_PAT"; "Content-Type" = "application/json" }

# Run SQL query
$body = @{ query = "SELECT * FROM tvs LIMIT 5" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://api.supabase.com/v1/projects/sxzmhlvrpfmothfjrqay/database/query" -Headers $headers -Method POST -Body $body
```

#### 2. Direct Database Access (Service Role)
**Use for:** Data queries, updates (from server-side code)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
```

#### 3. Web Dashboard
**URL:** https://supabase.com/dashboard/project/sxzmhlvrpfmothfjrqay

Use for: Manual data editing, SQL Editor, Table view, Logs

### Database Schema

**Main Table:** `tvs` (32 columns)

Key columns:
- `id` (UUID) - Primary key
- `brand`, `model`, `series` - TV identification
- `screen_size`, `panel_type`, `resolution` - Display specs
- `current_price`, `msrp` - Pricing
- `affiliate_amazon`, `affiliate_bestbuy`, `affiliate_walmart`, `affiliate_target` - Affiliate links
- `data_source`, `source_url` - Attribution
- `created_at`, `updated_at` - Timestamps

**Indexes:**
- `idx_tvs_brand`, `idx_tvs_screen_size`, `idx_tvs_panel_type`
- `idx_tvs_current_price`, `idx_tvs_availability`
- Composite indexes for common queries

---

## GitHub Repository

- **Owner:** Sawasdee7123
- **Repo:** tv-comparison-site
- **Default Branch:** main
- **URL:** https://github.com/Sawasdee7123/tv-comparison-site

### Key Branches
- `main` - Production code

### Recent Commits
- `15a6451` - Fix: wrap QuickFilters in client component wrapper
- `322dcf7` - Add: affiliate link support for TVs
- `c8709f1` - UI/UX: Phase 1 improvements
- `42526ad` - Fix: use dynamic rendering
- `23783ab` - Remove: local JSON fallback

---

## Vercel Deployment

- **Project Name:** tv-comparison-site
- **Project ID:** `prj_VUTMUeCFq8D5aBb3XSWsJG0ZujRX`
- **Framework:** Next.js
- **Node Version:** 24.x
- **Region:** iad1 (US East)

### Deployment URLs
- **Production:** https://frontend-ten-swart-37.vercel.app
- **Latest:** https://tv-comparison-site-git-main-marcs-projects-c6a21ede.vercel.app

### Environment Variables (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_BASE_URL`

---

## Skills & Tools Reference

### Supabase Skill
**Location:** `~/.openclaw/shared/skills/elon/supabase-workspace/SKILL.md`

**Key capabilities:**
- Account-wide management via PAT
- SQL query execution
- Project management
- Database administration

**Environment Variables needed:**
- `SUPABASE_PAT` - Personal Access Token (account-wide)
- `SUPABASE_SERVICE_ROLE_KEY` - Project-specific admin key

### Vercel Skill
**Location:** `~/.openclaw/shared/skills/elon/vercel-workspace/SKILL.md`

**Key capabilities:**
- Deploy project
- List deployments
- Check deployment status
- Update project settings

**Environment Variables needed:**
- `VERCEL_TOKEN` - API token

---

## Current Features

### Implemented
- ✅ 32 TVs in database (Supabase)
- ✅ Price-per-inch metric calculation
- ✅ Responsive comparison table with sorting/filtering
- ✅ TV detail pages
- ✅ Mobile navigation
- ✅ Quick filters (Budget, Size, Panel, Features)
- ✅ Trust bar with animated stats
- ✅ Affiliate link support (Amazon, Best Buy, Walmart, Target)
- ✅ Buy Now buttons with retailer selection
- ✅ Dark theme UI

### Affiliate Links Status
| TV | Amazon | Best Buy | Walmart | Target |
|----|--------|----------|---------|--------|
| Samsung QN85QN90FAFXZA | ✅ | ⬜ | ⬜ | ⬜ |
| All others (31) | ⬜ | ⬜ | ⬜ | ⬜ |

---

## Agent Instructions

**When spawning an agent to work on this project:**

1. **ALWAYS include in the task:**
   ```
   Read the README at C:\Users\Skynet\.openclaw\shared\projects\comparison-site-tv\README.md first.
   This contains critical project context, credentials, and access information.
   ```

2. **For database work:**
   - Use Management API with `SUPABASE_PAT` for schema changes
   - Use Service Role Key for data operations
   - Project ID: `sxzmhlvrpfmothfjrqay`

3. **For deployment:**
   - Git push triggers automatic Vercel deployment
   - Or use Vercel skill with `VERCEL_TOKEN`

4. **For frontend changes:**
   - Code is in `./frontend/`
   - Uses Next.js App Router
   - Components in `./frontend/app/components/`

---

## Common Tasks

### Add Affiliate Link to TV
```sql
UPDATE tvs 
SET affiliate_amazon = 'https://amzn.to/XXXXXXX'
WHERE brand = 'BrandName' AND model = 'ModelName';
```

### Deploy Latest Changes
```powershell
cd frontend
git add -A
git commit -m "Your message"
git push origin main
# Vercel auto-deploys
```

### Check Database Status
```sql
SELECT 
  brand, 
  model, 
  COUNT(*) as total_tvs,
  COUNT(affiliate_amazon) as with_amazon_links
FROM tvs 
GROUP BY brand
ORDER BY total_tvs DESC;
```

---

## Troubleshooting

**Issue:** "Invalid API key" when querying Supabase  
**Fix:** Use `SUPABASE_PAT` (Personal Access Token) not `SUPABASE_ANON_KEY` for Management API

**Issue:** Deployment fails with build error  
**Fix:** Check `npm run build` locally first. Common issues: missing env vars, TypeScript errors

**Issue:** Buy Now buttons show "Coming Soon"  
**Fix:** Add affiliate links to database. See "Affiliate Links Status" above.

---

## Project Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-13 | Removed Gaming Score | Deprecated feature |
| 2026-03-13 | Removed local JSON fallback | Supabase is sole source of truth |
| 2026-03-13 | Added dynamic rendering | Fixes build-time API issues |
| 2026-03-13 | Added affiliate link columns | Monetization |
| 2026-03-15 | Added Phase 1 UX improvements | Better user experience |

---

## Contacts

- **Project Owner:** Marc
- **Chief of Staff:** Bob (me)
- **CTO:** Elon (infrastructure)

---

*Last updated: March 15, 2026 by Bob*
