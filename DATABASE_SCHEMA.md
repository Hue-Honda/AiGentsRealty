# AiGentsRealty Database Schema

**Last Updated:** December 8, 2025
**Database:** PostgreSQL (Supabase)

---

## Overview

| Table | Rows | Description |
|-------|------|-------------|
| `areas` | 322 | Dubai areas/districts |
| `projects` | 31 | Off-plan property projects |
| `developers` | 41 | Property developers |
| `area_market_stats` | 256 | Real DLD market stats per area |
| `market_trends` | 429 | Monthly market trends (1990-2025) |
| `area_monthly_stats` | 33,881 | Detailed area stats per month |

### Views
- `projects_with_details` - Projects with developer and area info
- `area_stats` - Areas with project counts and min prices

---

## Tables

### 1. `areas`
Main areas/districts in Dubai.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | integer | NO | Primary key |
| `slug` | varchar(255) | NO | URL-friendly identifier |
| `name` | varchar(255) | NO | Display name |
| `image` | text | NO | Image URL |
| `starting_price` | varchar(100) | NO | Starting price (e.g., "AED 1.2M") |
| `project_count` | integer | YES | Number of projects |
| `description` | text | NO | Area description |
| `created_at` | timestamp | YES | Record creation time |
| `updated_at` | timestamp | YES | Last update time |
| `embedding` | vector | YES | AI embedding for semantic search |

---

### 2. `projects`
Off-plan property projects.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | integer | NO | Primary key |
| `slug` | varchar(255) | NO | URL-friendly identifier |
| `name` | varchar(255) | NO | Project name |
| `developer_id` | integer | YES | FK to developers |
| `area_id` | integer | YES | FK to areas |
| `location` | varchar(255) | NO | Location description |
| `latitude` | numeric(10,7) | YES | GPS latitude |
| `longitude` | numeric(10,7) | YES | GPS longitude |
| `nearby_places` | jsonb | YES | Array of nearby POIs |
| `price_from` | varchar(100) | NO | Starting price |
| `starting_price` | varchar(100) | YES | Alternative price format |
| `payment_plan` | varchar(50) | YES | Payment plan (e.g., "80/20") |
| `completion_date` | varchar(50) | YES | Expected completion |
| `handover` | varchar(50) | YES | Handover date |
| `status` | varchar(50) | YES | Project status (default: "Off Plan") |
| `title_type` | varchar(50) | YES | Title type (default: "Freehold") |
| `property_types` | jsonb | YES | Array of property types |
| `images` | jsonb | YES | Array of image URLs |
| `description` | text | NO | Project description |
| `amenities` | jsonb | YES | Array of amenities |
| `payment_plans` | jsonb | YES | Payment plan breakdown |
| `unit_types` | jsonb | YES | Available unit types |
| `bedrooms` | integer | YES | Number of bedrooms |
| `bathrooms` | integer | YES | Number of bathrooms |
| `sqft` | integer | YES | Size in sqft |
| `match_score` | integer | YES | AI match score |
| `created_at` | timestamp | YES | Record creation time |
| `updated_at` | timestamp | YES | Last update time |
| `embedding` | vector | YES | AI embedding for semantic search |

**JSONB Examples:**
```json
// nearby_places
[
  {"name": "Dubai Mall", "distance": "15 min drive", "type": "Shopping"},
  {"name": "Burj Khalifa", "distance": "18 min drive", "type": "Landmark"}
]

// property_types
["Apartments", "Penthouses"]

// amenities
["Swimming Pool", "Gym", "Kids Play Area", "Security 24/7"]

// payment_plans
[
  {"stage": "On Booking", "percentage": 20},
  {"stage": "During Construction", "percentage": 60},
  {"stage": "On Handover", "percentage": 20}
]

// unit_types
[
  {"type": "Studio", "size": "450 sqft", "price": "AED 650K"},
  {"type": "1 Bedroom", "size": "750 sqft", "price": "AED 900K"}
]
```

---

### 3. `developers`
Property developers.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | integer | NO | Primary key |
| `slug` | varchar(255) | NO | URL-friendly identifier |
| `name` | varchar(255) | NO | Developer name |
| `logo` | text | YES | Logo URL |
| `description` | text | YES | Developer description |
| `website` | varchar(255) | YES | Website URL |
| `created_at` | timestamp | YES | Record creation time |
| `updated_at` | timestamp | YES | Last update time |

---

### 4. `area_market_stats`
**Real DLD (Dubai Land Department) market statistics per area.**

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | integer | NO | Primary key |
| `area_name` | varchar(255) | NO | Area name from DLD |
| `area_slug` | varchar(255) | YES | URL-friendly identifier |
| `avg_price_sqft` | numeric(15,2) | YES | Average price per sqft (AED) |
| `median_price_sqft` | numeric(15,2) | YES | Median price per sqft (AED) |
| `min_price` | numeric(18,2) | YES | Minimum transaction price |
| `max_price` | numeric(18,2) | YES | Maximum transaction price |
| `avg_transaction_value` | numeric(18,2) | YES | Average transaction value |
| `total_transactions_6m` | integer | YES | Transactions in last 6 months |
| `total_transactions_12m` | integer | YES | Transactions in last 12 months |
| `total_volume_12m` | numeric(22,2) | YES | Total volume in last 12 months |
| `yoy_price_change` | numeric(10,2) | YES | Year-over-year price change % |
| `mom_price_change` | numeric(10,2) | YES | Month-over-month price change % |
| `top_property_type` | varchar(50) | YES | Most common property type |
| `avg_unit_size` | numeric(10,2) | YES | Average unit size (sqft) |
| `last_updated` | timestamp | YES | Last data update |
| `data_from_date` | date | YES | Data range start |
| `data_to_date` | date | YES | Data range end |

---

### 5. `market_trends`
**Real DLD monthly market trends (1990-2025).**

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | integer | NO | Primary key |
| `month` | integer | NO | Month (1-12) |
| `year` | integer | NO | Year |
| `total_transactions` | integer | YES | Total transactions that month |
| `total_volume_aed` | numeric(22,2) | YES | Total volume in AED |
| `avg_price_sqft` | numeric(15,2) | YES | Average price per sqft |
| `median_price_sqft` | numeric(15,2) | YES | Median price per sqft |
| `top_area` | varchar(255) | YES | Most active area |
| `top_area_transactions` | integer | YES | Transactions in top area |
| `property_type_breakdown` | jsonb | YES | Breakdown by property type |
| `created_at` | timestamp | YES | Record creation time |

**JSONB Example:**
```json
// property_type_breakdown
{
  "Villa": 1234,
  "Apartment": 5678,
  "Land": 890
}
```

---

### 6. `area_monthly_stats`
**Real DLD granular monthly statistics per area (33,881 records).**

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | integer | NO | Primary key |
| `area_name` | varchar(255) | NO | Area name |
| `month` | integer | NO | Month (1-12) |
| `year` | integer | NO | Year |
| `transactions_count` | integer | YES | Number of transactions |
| `avg_price_sqft` | numeric(15,2) | YES | Average price per sqft |
| `total_volume` | numeric(22,2) | YES | Total transaction volume |
| `avg_unit_size` | numeric(10,2) | YES | Average unit size |
| `villa_count` | integer | YES | Villa transactions |
| `apartment_count` | integer | YES | Apartment transactions |
| `land_count` | integer | YES | Land transactions |
| `created_at` | timestamp | YES | Record creation time |

---

## Views

### `projects_with_details`
Projects joined with developer and area information.

```sql
SELECT
  p.*,
  d.name as developer_name,
  d.logo as developer_logo,
  a.name as area_name,
  a.slug as area_slug
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN areas a ON p.area_id = a.id;
```

### `area_stats`
Areas with actual project counts and minimum prices.

```sql
SELECT
  a.*,
  COUNT(p.id) as actual_project_count,
  MIN(parsed_price) as min_price
FROM areas a
LEFT JOIN projects p ON a.id = p.area_id
GROUP BY a.id;
```

---

## Indexes

| Table | Index | Columns |
|-------|-------|---------|
| `areas` | `idx_areas_slug` | slug |
| `projects` | `idx_projects_slug` | slug |
| `projects` | `idx_projects_area_id` | area_id |
| `projects` | `idx_projects_developer_id` | developer_id |
| `projects` | `idx_projects_status` | status |
| `developers` | `idx_developers_slug` | slug |
| `area_market_stats` | `idx_area_market_stats_slug` | area_slug |
| `market_trends` | `idx_market_trends_year_month` | year, month |
| `area_monthly_stats` | `idx_area_monthly_area_year_month` | area_name, year, month |

---

## Data Sources

### Real DLD Data (1.6M+ transactions)
The following tables contain **real data** from Dubai Land Department:
- `area_market_stats` - 256 areas with aggregated statistics
- `market_trends` - 429 months of market data (1990-2025)
- `area_monthly_stats` - 33,881 area-month records

### Sample/Seed Data
- `areas` - 281 areas (256 from DLD + original seed data)
- `projects` - 31 sample off-plan projects
- `developers` - 14 developers

---

## Entity Relationships

```
developers (1) ──────< projects (many)
                           │
areas (1) ────────────────<┘

area_market_stats ─── linked by area_slug ───> areas
```

---

## Common Queries

### Get area with market stats
```sql
SELECT a.*, ams.*
FROM areas a
LEFT JOIN area_market_stats ams ON a.slug = ams.area_slug
WHERE a.slug = 'business-bay';
```

### Get monthly trends for a year
```sql
SELECT * FROM market_trends
WHERE year = 2024
ORDER BY month;
```

### Get area performance over time
```sql
SELECT year, month, avg_price_sqft, transactions_count
FROM area_monthly_stats
WHERE area_name = 'Business Bay'
ORDER BY year DESC, month DESC
LIMIT 12;
```

### Top areas by transaction volume
```sql
SELECT area_name, total_transactions_12m, avg_price_sqft
FROM area_market_stats
ORDER BY total_transactions_12m DESC
LIMIT 10;
```
