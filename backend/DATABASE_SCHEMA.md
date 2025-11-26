# AiGentsRealty Database Schema Documentation

## Overview
This document describes the complete database schema for the AiGentsRealty application, including all tables, fields, relationships, and API endpoints.

## Database: `aigentsrealty`
- **Type**: PostgreSQL 16
- **Connection**: localhost:5432
- **Credentials**: See `.env` file

---

## Tables

### 1. `areas`
Stores Dubai real estate areas/districts (top-level locations).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Unique identifier |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly identifier (e.g., "dubai-hills-estate") |
| `name` | VARCHAR(255) | NOT NULL | Display name (e.g., "Dubai Hills Estate") |
| `image` | TEXT | NOT NULL | Image URL for the area |
| `starting_price` | VARCHAR(100) | NOT NULL | Formatted starting price (e.g., "AED 900,000") |
| `project_count` | INTEGER | DEFAULT 0 | Number of projects in this area |
| `description` | TEXT | NOT NULL | Brief description of the area |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_areas_slug` on `slug`

**Example Data:**
```json
{
  "id": 2,
  "slug": "dubai-hills-estate",
  "name": "Dubai Hills Estate",
  "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
  "starting_price": "AED 900,000",
  "project_count": 45,
  "description": "A master-planned community offering luxury living..."
}
```

---

### 2. `developers`
Stores real estate developer information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Unique identifier |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly identifier (e.g., "emaar-properties") |
| `name` | VARCHAR(255) | NOT NULL | Developer name (e.g., "Emaar Properties") |
| `logo` | TEXT | | Logo image URL |
| `description` | TEXT | | Developer description |
| `website` | VARCHAR(255) | | Developer website URL |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_developers_slug` on `slug`

**Example Data:**
```json
{
  "id": 1,
  "slug": "emaar-properties",
  "name": "Emaar Properties",
  "logo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
  "description": "Leading real estate developer in Dubai..."
}
```

---

### 3. `projects`
Stores individual property projects/developments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Unique identifier |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly identifier (e.g., "azure-residences") |
| `name` | VARCHAR(255) | NOT NULL | Project name |
| `developer_id` | INTEGER | FK → developers(id) | Reference to developer |
| `area_id` | INTEGER | FK → areas(id), CASCADE | Reference to area |
| `location` | VARCHAR(255) | NOT NULL | Location description |
| `price_from` | VARCHAR(100) | NOT NULL | Starting price (e.g., "AED 900K") |
| `starting_price` | VARCHAR(100) | | Full starting price (e.g., "AED 900,000") |
| `payment_plan` | VARCHAR(50) | | Payment plan description (e.g., "80/20") |
| `completion_date` | VARCHAR(50) | | Estimated completion date |
| `handover` | VARCHAR(50) | | Handover period (e.g., "Q2 2027") |
| `status` | VARCHAR(50) | DEFAULT 'Off Plan' | Project status |
| `title_type` | VARCHAR(50) | DEFAULT 'Freehold' | Ownership type |
| `property_types` | JSONB | DEFAULT '[]' | Array of property types ["Apartments", "Penthouses"] |
| `images` | JSONB | DEFAULT '[]' | Array of image URLs |
| `description` | TEXT | NOT NULL | Project description |
| `amenities` | JSONB | DEFAULT '[]' | Array of amenity names |
| `payment_plans` | JSONB | DEFAULT '[]' | Array of payment plan objects |
| `unit_types` | JSONB | DEFAULT '[]' | Array of unit type objects |
| `bedrooms` | INTEGER | | Number of bedrooms (for listing) |
| `bathrooms` | INTEGER | | Number of bathrooms (for listing) |
| `sqft` | INTEGER | | Square footage (for listing) |
| `match_score` | INTEGER | DEFAULT 0 | AI match score (0-100) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_projects_slug` on `slug`
- `idx_projects_area_id` on `area_id`
- `idx_projects_developer_id` on `developer_id`
- `idx_projects_status` on `status`

**JSONB Field Examples:**

`property_types`:
```json
["Apartments", "Penthouses"]
```

`images`:
```json
[
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop"
]
```

`amenities`:
```json
["Swimming Pool", "Fitness Center", "Kids Play Area", "BBQ Area"]
```

`payment_plans`:
```json
[
  {"stage": "On Booking", "percentage": 20},
  {"stage": "During Construction", "percentage": 60},
  {"stage": "On Handover", "percentage": 20}
]
```

`unit_types`:
```json
[
  {"type": "Studio", "size": "450 sqft", "price": "AED 650K"},
  {"type": "1 Bedroom", "size": "750 sqft", "price": "AED 900K"},
  {"type": "2 Bedroom", "size": "1,200 sqft", "price": "AED 1.4M"}
]
```

---

## Views

### 1. `projects_with_details`
Combines project data with developer and area information.

**Columns**: All project columns plus:
- `developer_name` - Developer name
- `developer_logo` - Developer logo URL
- `area_name` - Area name
- `area_slug` - Area slug for URLs

### 2. `area_stats`
Provides area statistics with calculated project counts and minimum prices.

**Columns**: All area columns plus:
- `actual_project_count` - Actual count of projects
- `min_price` - Minimum project price (calculated)

---

## Relationships

```
areas (1) ----< (N) projects (N) >---- (1) developers
  id                  area_id               developer_id
                      (CASCADE)              (SET NULL)
```

- **One area** has **many projects** (CASCADE delete)
- **One developer** has **many projects** (SET NULL on developer delete)

---

## API Endpoints

### Areas Endpoints

#### `GET /api/areas`
Get all areas with basic information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "slug": "dubai-hills-estate",
      "name": "Dubai Hills Estate",
      "image": "...",
      "starting_price": "AED 900,000",
      "project_count": 45,
      "description": "..."
    }
  ]
}
```

#### `GET /api/areas/:slug`
Get specific area with all its projects.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "slug": "dubai-hills-estate",
    "name": "Dubai Hills Estate",
    "...": "...",
    "projects": [
      {
        "id": 1,
        "slug": "azure-residences",
        "name": "Azure Residences",
        "developer_name": "Emaar Properties",
        "...": "..."
      }
    ]
  }
}
```

#### `GET /api/areas/:areaSlug/projects/:projectSlug`
Get specific project details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "azure-residences",
    "name": "Azure Residences",
    "developer_name": "Emaar Properties",
    "developer_logo": "...",
    "area_name": "Dubai Hills Estate",
    "area_slug": "dubai-hills-estate",
    "price_from": "AED 900K",
    "images": [...],
    "amenities": [...],
    "payment_plans": [...],
    "unit_types": [...]
  }
}
```

### Projects Endpoints

#### `GET /api/projects/suggestions`
Get AI-powered property suggestions (ordered by match_score).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "azure-residences",
      "name": "Azure Residences",
      "developer_name": "Emaar Properties",
      "area_slug": "dubai-hills-estate",
      "match_score": 95,
      "bedrooms": 2,
      "bathrooms": 2,
      "sqft": 1200,
      "...": "..."
    }
  ]
}
```

#### `GET /api/projects/featured`
Get featured off-plan projects.

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

#### `GET /api/projects?area=:slug&developer=:slug&status=:status&limit=20`
Get filtered list of projects with optional query parameters.

**Query Parameters:**
- `area` - Filter by area slug
- `developer` - Filter by developer slug
- `status` - Filter by project status
- `limit` - Maximum results (default: 20)

---

## Database Functions & Triggers

### `update_updated_at_column()`
Automatically updates the `updated_at` timestamp on record modification.

**Applied to:**
- `areas` table
- `developers` table
- `projects` table

---

## Seeded Data

### Areas: 12 records
- Al Furjan
- Arabian Ranches
- Bluewaters Island
- Business Bay
- Downtown Dubai
- Dubai Creek Harbour
- Dubai Design District (d3)
- Dubai Hills Estate
- Dubai Marina
- Dubai South
- Jumeirah Village Circle (JVC)
- Palm Jumeirah

### Developers: 5 records
- Emaar Properties
- DAMAC Properties
- Meraas
- Nakheel
- Sobha Realty

### Projects: 6 records
- Azure Residences (Dubai Hills Estate)
- Marina Heights (Dubai Marina)
- Palm Gardens (Palm Jumeirah)
- Creek Views (Dubai Creek Harbour)
- Downtown Elite (Downtown Dubai)
- Business Bay Tower (Business Bay)

---

## Frontend URL Structure

```
/areas                                    → List all areas
/areas/:areaSlug                          → Area detail + projects list
/areas/:areaSlug/:projectSlug             → Project detail page
```

**Examples:**
- `/areas/dubai-hills-estate`
- `/areas/dubai-hills-estate/azure-residences`

---

## Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aigentsrealty
DB_USER=postgres
DB_PASSWORD=postgres123
```

---

## Quick Reference: Key Field Names

When updating frontend components, use these exact field names from the API:

**Areas:**
- `slug` (not `districtSlug`)
- `starting_price` (not `startingPrice`)
- `project_count` (not `projectCount`)

**Projects:**
- `price_from` (short version like "AED 900K")
- `starting_price` (full version like "AED 900,000")
- `area_slug` (for building URLs)
- `developer_name` (joined from developers table)
- `developer_logo` (joined from developers table)
- `property_types` (JSONB array)
- `payment_plans` (JSONB array of objects)
- `unit_types` (JSONB array of objects)

---

## Schema File Location

The complete SQL schema with seed data is located at:
`backend/database/init.sql`
