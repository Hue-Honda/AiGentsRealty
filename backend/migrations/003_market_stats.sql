-- Market Statistics Tables
-- Pre-aggregated data from DLD transactions for fast queries

-- Area Market Stats (one row per area ~258 rows)
CREATE TABLE IF NOT EXISTS area_market_stats (
    id SERIAL PRIMARY KEY,
    area_name VARCHAR(255) NOT NULL UNIQUE,
    area_slug VARCHAR(255),

    -- Price metrics
    avg_price_sqft DECIMAL(12, 2),
    median_price_sqft DECIMAL(12, 2),
    min_price DECIMAL(15, 2),
    max_price DECIMAL(15, 2),
    avg_transaction_value DECIMAL(15, 2),

    -- Volume metrics
    total_transactions_6m INTEGER DEFAULT 0,
    total_transactions_12m INTEGER DEFAULT 0,
    total_volume_12m DECIMAL(18, 2),

    -- Trends
    yoy_price_change DECIMAL(5, 2), -- percentage
    mom_price_change DECIMAL(5, 2), -- month over month

    -- Property breakdown
    top_property_type VARCHAR(100),
    avg_unit_size DECIMAL(15, 2),

    -- Metadata
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_from_date DATE,
    data_to_date DATE
);

-- Monthly Market Trends (overall market ~36 rows for 3 years)
CREATE TABLE IF NOT EXISTS market_trends (
    id SERIAL PRIMARY KEY,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,

    -- Volume
    total_transactions INTEGER DEFAULT 0,
    total_volume_aed DECIMAL(18, 2),

    -- Prices
    avg_price_sqft DECIMAL(12, 2),
    median_price_sqft DECIMAL(12, 2),

    -- Top performers
    top_area VARCHAR(255),
    top_area_transactions INTEGER,

    -- Property type breakdown (JSON)
    property_type_breakdown JSONB,

    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(month, year)
);

-- Area Monthly Stats (detailed per area per month ~9K rows)
CREATE TABLE IF NOT EXISTS area_monthly_stats (
    id SERIAL PRIMARY KEY,
    area_name VARCHAR(255) NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,

    -- Metrics
    transactions_count INTEGER DEFAULT 0,
    avg_price_sqft DECIMAL(12, 2),
    total_volume DECIMAL(18, 2),
    avg_unit_size DECIMAL(15, 2),

    -- Property types count
    villa_count INTEGER DEFAULT 0,
    apartment_count INTEGER DEFAULT 0,
    land_count INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(area_name, month, year)
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_area_market_stats_slug ON area_market_stats(area_slug);
CREATE INDEX IF NOT EXISTS idx_area_market_stats_name ON area_market_stats(area_name);
CREATE INDEX IF NOT EXISTS idx_market_trends_date ON market_trends(year, month);
CREATE INDEX IF NOT EXISTS idx_area_monthly_area ON area_monthly_stats(area_name);
CREATE INDEX IF NOT EXISTS idx_area_monthly_date ON area_monthly_stats(year, month);
