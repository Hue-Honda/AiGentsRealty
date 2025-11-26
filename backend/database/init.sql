-- AiGentsRealty Database Schema
-- This schema supports the areas → districts → projects hierarchy

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================
-- AREAS (TOP LEVEL - Dubai regions)
-- ============================
CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    starting_price VARCHAR(100) NOT NULL,
    project_count INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_areas_slug ON areas(slug);

-- ============================
-- DEVELOPERS
-- ============================
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    description TEXT,
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_developers_slug ON developers(slug);

-- ============================
-- PROJECTS (Properties in specific areas)
-- ============================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    developer_id INTEGER REFERENCES developers(id) ON DELETE SET NULL,
    area_id INTEGER REFERENCES areas(id) ON DELETE CASCADE,

    -- Location details
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    nearby_places JSONB DEFAULT '[]',

    -- Pricing
    price_from VARCHAR(100) NOT NULL,
    starting_price VARCHAR(100),

    -- Project details
    payment_plan VARCHAR(50),
    completion_date VARCHAR(50),
    handover VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Off Plan',
    title_type VARCHAR(50) DEFAULT 'Freehold',

    -- Property types (stored as JSON array)
    property_types JSONB DEFAULT '[]',

    -- Media
    images JSONB DEFAULT '[]',

    -- Description
    description TEXT NOT NULL,

    -- Amenities (stored as JSON array)
    amenities JSONB DEFAULT '[]',

    -- Payment plans breakdown (stored as JSON array of objects)
    payment_plans JSONB DEFAULT '[]',

    -- Unit types (stored as JSON array of objects)
    unit_types JSONB DEFAULT '[]',

    -- Property specs for listings
    bedrooms INTEGER,
    bathrooms INTEGER,
    sqft INTEGER,
    match_score INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_area_id ON projects(area_id);
CREATE INDEX idx_projects_developer_id ON projects(developer_id);
CREATE INDEX idx_projects_status ON projects(status);

-- ============================
-- TRIGGERS FOR UPDATED_AT
-- ============================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON areas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_developers_updated_at BEFORE UPDATE ON developers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================
-- SEED DATA - AREAS
-- ============================
INSERT INTO areas (slug, name, image, starting_price, project_count, description) VALUES
('dubai-design-district-dubai', 'Dubai Design District (d3)', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop', 'AED 1,200,000', 12, 'Known for its iconic landmarks and creative atmosphere, this vibrant community features a diverse selection of properties.'),
('dubai-hills-estate', 'Dubai Hills Estate', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', 'AED 900,000', 45, 'A master-planned community offering luxury living with world-class amenities and stunning views of Dubai skyline.'),
('dubai-marina', 'Dubai Marina', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', 'AED 1,100,000', 88, 'Waterfront living at its finest with stunning marina views, dining, and entertainment options.'),
('palm-jumeirah', 'Palm Jumeirah', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', 'AED 2,500,000', 34, 'The iconic man-made island offering exclusive beachfront properties and luxury residences.'),
('downtown-dubai', 'Downtown Dubai', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', 'AED 1,500,000', 67, 'The heart of Dubai featuring Burj Khalifa, Dubai Mall, and world-class urban living.'),
('business-bay', 'Business Bay', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', 'AED 950,000', 92, 'Central business district with modern skyscrapers and canal views, perfect for professionals.'),
('dubai-creek-harbour', 'Dubai Creek Harbour', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop', 'AED 1,200,000', 28, 'A new waterfront destination combining heritage with modern living and investment opportunities.'),
('jumeirah-village-circle', 'Jumeirah Village Circle (JVC)', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', 'AED 650,000', 343, 'Family-friendly community with affordable housing options and excellent connectivity.'),
('arabian-ranches', 'Arabian Ranches', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop', 'AED 1,800,000', 23, 'Desert-themed community offering spacious villas and a peaceful family lifestyle.'),
('bluewaters-island', 'Bluewaters Island', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop', 'AED 2,200,000', 8, 'Modern island living with Ain Dubai as the centerpiece and beachfront access.'),
('dubai-south', 'Dubai South', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', 'AED 550,000', 42, 'Future-focused development near Al Maktoum International Airport with affordable options.'),
('al-furjan', 'Al Furjan', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop', 'AED 1,100,000', 18, 'Well-connected family community with modern amenities and metro accessibility.');

-- ============================
-- SEED DATA - DEVELOPERS
-- ============================
INSERT INTO developers (slug, name, logo, description) VALUES
('emaar-properties', 'Emaar Properties', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop', 'Leading real estate developer in Dubai, known for iconic projects like Burj Khalifa and Dubai Mall.'),
('damac-properties', 'DAMAC Properties', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop', 'Luxury property developer specializing in high-end residential and commercial projects.'),
('meraas', 'Meraas', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop', 'Dubai-based holding company creating lifestyle destinations and communities.'),
('nakheel', 'Nakheel', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop', 'Master developer behind Palm Jumeirah and other iconic Dubai developments.'),
('sobha-realty', 'Sobha Realty', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop', 'Premium real estate developer focusing on quality and craftsmanship.');

-- ============================
-- SEED DATA - PROJECTS
-- ============================

-- Azure Residences (Dubai Hills Estate)
INSERT INTO projects (
    slug, name, developer_id, area_id, location, latitude, longitude, nearby_places,
    price_from, starting_price, payment_plan, completion_date, handover, status, title_type,
    property_types, images, description, amenities, payment_plans, unit_types,
    bedrooms, bathrooms, sqft, match_score
) VALUES (
    'azure-residences',
    'Azure Residences',
    (SELECT id FROM developers WHERE slug = 'emaar-properties'),
    (SELECT id FROM areas WHERE slug = 'dubai-hills-estate'),
    'Dubai Hills Estate',
    25.1022,
    55.2495,
    '[
        {"name": "Dubai Mall", "distance": "15 min drive", "type": "Shopping"},
        {"name": "Burj Khalifa", "distance": "18 min drive", "type": "Landmark"},
        {"name": "Dubai Hills Mall", "distance": "5 min walk", "type": "Shopping"},
        {"name": "Dubai Hills Golf Course", "distance": "3 min drive", "type": "Recreation"},
        {"name": "Dubai International Airport", "distance": "25 min drive", "type": "Airport"},
        {"name": "GEMS School", "distance": "8 min drive", "type": "Education"}
    ]',
    'AED 900K',
    'AED 900,000',
    '80/20',
    'Q4 2025',
    'Q2 2027',
    'Off Plan',
    'Freehold',
    '["Apartments", "Penthouses"]',
    '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop"]',
    'Azure Residences represents the pinnacle of luxury living in Dubai Hills Estate. This exceptional development by Emaar Properties offers meticulously designed residences with breathtaking views and world-class amenities.',
    '["Swimming Pool", "Fitness Center", "Kids Play Area", "BBQ Area", "Landscaped Gardens", "Security 24/7", "Covered Parking", "Concierge Service", "Yoga Deck", "Jogging Track", "Steam & Sauna", "Multi-purpose Hall"]',
    '[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 60}, {"stage": "On Handover", "percentage": 20}]',
    '[{"type": "Studio", "size": "450 sqft", "price": "AED 650K"}, {"type": "1 Bedroom", "size": "750 sqft", "price": "AED 900K"}, {"type": "2 Bedroom", "size": "1,200 sqft", "price": "AED 1.4M"}, {"type": "3 Bedroom", "size": "1,800 sqft", "price": "AED 2.1M"}, {"type": "Penthouse", "size": "3,500 sqft", "price": "AED 5.5M"}]',
    2,
    2,
    1200,
    95
);

-- Marina Heights (Dubai Marina)
INSERT INTO projects (
    slug, name, developer_id, area_id, location, price_from, starting_price,
    payment_plan, completion_date, handover, status, title_type,
    property_types, images, description, amenities, payment_plans, unit_types,
    bedrooms, bathrooms, sqft, match_score
) VALUES (
    'marina-heights',
    'Marina Heights',
    (SELECT id FROM developers WHERE slug = 'damac-properties'),
    (SELECT id FROM areas WHERE slug = 'dubai-marina'),
    'Dubai Marina',
    'AED 1.2M',
    'AED 1,200,000',
    '10/70/20',
    'Q4 2026',
    'Q4 2026',
    'Off Plan',
    'Freehold',
    '["Apartments", "Penthouses"]',
    '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]',
    'Marina Heights offers stunning waterfront living with panoramic views of Dubai Marina. Premium apartments with luxury finishes and world-class amenities.',
    '["Infinity Pool", "Gym", "Marina Walk Access", "Retail Outlets", "Valet Parking", "Concierge", "Kids Area"]',
    '[{"stage": "On Booking", "percentage": 10}, {"stage": "During Construction", "percentage": 70}, {"stage": "On Handover", "percentage": 20}]',
    '[{"type": "1 Bedroom", "size": "850 sqft", "price": "AED 1.2M"}, {"type": "2 Bedroom", "size": "1,400 sqft", "price": "AED 1.8M"}, {"type": "3 Bedroom", "size": "2,000 sqft", "price": "AED 2.5M"}]',
    3,
    3,
    1800,
    92
);

-- Palm Gardens (Palm Jumeirah)
INSERT INTO projects (
    slug, name, developer_id, area_id, location, price_from, starting_price,
    payment_plan, completion_date, handover, status, title_type,
    property_types, images, description, amenities, payment_plans, unit_types,
    bedrooms, bathrooms, sqft, match_score
) VALUES (
    'palm-gardens',
    'Palm Gardens',
    (SELECT id FROM developers WHERE slug = 'nakheel'),
    (SELECT id FROM areas WHERE slug = 'palm-jumeirah'),
    'Palm Jumeirah',
    'AED 2.5M',
    'AED 2,500,000',
    '20/60/20',
    'Q1 2028',
    'Q1 2028',
    'Off Plan',
    'Freehold',
    '["Villas", "Townhouses"]',
    '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop"]',
    'Exclusive beachfront living on the iconic Palm Jumeirah. Luxury villas with private beach access and stunning Arabian Gulf views.',
    '["Private Beach", "Beach Club", "Infinity Pool", "Spa", "Gym", "Restaurants", "Valet Parking", "Security 24/7"]',
    '[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 60}, {"stage": "On Handover", "percentage": 20}]',
    '[{"type": "3 Bedroom Villa", "size": "2,500 sqft", "price": "AED 2.5M"}, {"type": "4 Bedroom Villa", "size": "3,500 sqft", "price": "AED 4.2M"}, {"type": "5 Bedroom Villa", "size": "5,000 sqft", "price": "AED 6.5M"}]',
    4,
    4,
    3000,
    88
);

-- Creek Views (Dubai Creek Harbour)
INSERT INTO projects (
    slug, name, developer_id, area_id, location, price_from, starting_price,
    payment_plan, completion_date, handover, status, title_type,
    property_types, images, description, amenities, payment_plans, unit_types,
    bedrooms, bathrooms, sqft, match_score
) VALUES (
    'creek-views',
    'Creek Views',
    (SELECT id FROM developers WHERE slug = 'emaar-properties'),
    (SELECT id FROM areas WHERE slug = 'dubai-creek-harbour'),
    'Dubai Creek Harbour',
    'AED 1.8M',
    'AED 1,800,000',
    '20/40/40',
    'Q3 2027',
    'Q3 2027',
    'Off Plan',
    'Freehold',
    '["Apartments"]',
    '["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]',
    'Modern waterfront living with views of Dubai Creek Tower. Contemporary design with premium amenities and excellent connectivity.',
    '["Creek Views", "Swimming Pool", "Gym", "Running Track", "Parks", "Retail", "Schools Nearby"]',
    '[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 40}, {"stage": "On Handover", "percentage": 40}]',
    '[{"type": "1 Bedroom", "size": "800 sqft", "price": "AED 1.1M"}, {"type": "2 Bedroom", "size": "1,300 sqft", "price": "AED 1.8M"}, {"type": "3 Bedroom", "size": "1,900 sqft", "price": "AED 2.4M"}]',
    3,
    2,
    1600,
    85
);

-- Downtown Elite (Downtown Dubai)
INSERT INTO projects (
    slug, name, developer_id, area_id, location, price_from, starting_price,
    payment_plan, completion_date, handover, status, title_type,
    property_types, images, description, amenities, payment_plans, unit_types,
    bedrooms, bathrooms, sqft, match_score
) VALUES (
    'downtown-elite',
    'Downtown Elite',
    (SELECT id FROM developers WHERE slug = 'emaar-properties'),
    (SELECT id FROM areas WHERE slug = 'downtown-dubai'),
    'Downtown Dubai',
    'AED 1.5M',
    'AED 1,500,000',
    '20/55/25',
    'Q1 2027',
    'Q1 2027',
    'Off Plan',
    'Freehold',
    '["Apartments", "Penthouses"]',
    '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]',
    'Premium living in the heart of Dubai with Burj Khalifa views. Steps away from Dubai Mall and world-class entertainment.',
    '["Burj Khalifa Views", "Infinity Pool", "Sky Lounge", "Gym", "Valet Parking", "Concierge", "Dubai Mall Access"]',
    '[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 55}, {"stage": "On Handover", "percentage": 25}]',
    '[{"type": "1 Bedroom", "size": "900 sqft", "price": "AED 1.5M"}, {"type": "2 Bedroom", "size": "1,400 sqft", "price": "AED 2.2M"}, {"type": "3 Bedroom", "size": "2,100 sqft", "price": "AED 3.5M"}]',
    2,
    2,
    1400,
    90
);

-- Business Bay Tower (Business Bay)
INSERT INTO projects (
    slug, name, developer_id, area_id, location, price_from, starting_price,
    payment_plan, completion_date, handover, status, title_type,
    property_types, images, description, amenities, payment_plans, unit_types,
    bedrooms, bathrooms, sqft, match_score
) VALUES (
    'business-bay-tower',
    'Business Bay Tower',
    (SELECT id FROM developers WHERE slug = 'damac-properties'),
    (SELECT id FROM areas WHERE slug = 'business-bay'),
    'Business Bay',
    'AED 1.1M',
    'AED 1,100,000',
    '20/50/30',
    'Q2 2028',
    'Q2 2028',
    'Off Plan',
    'Freehold',
    '["Apartments"]',
    '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]',
    'Modern business district living with canal views. Perfect for professionals seeking luxury and convenience in central Dubai.',
    '["Canal Views", "Pool", "Gym", "Business Center", "Metro Access", "Retail Podium", "Parking"]',
    '[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 50}, {"stage": "On Handover", "percentage": 30}]',
    '[{"type": "Studio", "size": "500 sqft", "price": "AED 750K"}, {"type": "1 Bedroom", "size": "800 sqft", "price": "AED 1.1M"}, {"type": "2 Bedroom", "size": "1,200 sqft", "price": "AED 1.6M"}]',
    2,
    2,
    1100,
    87
);

-- ============================
-- VIEWS FOR EASY QUERYING
-- ============================

-- View to get projects with developer and area information
CREATE VIEW projects_with_details AS
SELECT
    p.*,
    d.name as developer_name,
    d.logo as developer_logo,
    a.name as area_name,
    a.slug as area_slug
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN areas a ON p.area_id = a.id;

-- View to get area statistics
CREATE VIEW area_stats AS
SELECT
    a.*,
    COUNT(p.id) as actual_project_count,
    MIN(CAST(REPLACE(REPLACE(p.price_from, 'AED ', ''), 'K', '000') AS INTEGER)) as min_price
FROM areas a
LEFT JOIN projects p ON a.id = p.area_id
GROUP BY a.id;
