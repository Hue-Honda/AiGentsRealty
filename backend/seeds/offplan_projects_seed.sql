-- =============================================================================
-- Off-Plan Projects Seed Data
-- Run this in Supabase SQL Editor to add all extracted off-plan projects
-- =============================================================================

-- First, ensure we have the required developers
INSERT INTO developers (slug, name, logo, description, website) VALUES
  ('emaar', 'Emaar Properties', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200', 'Emaar Properties is a leading global property developer and provider of premium lifestyles.', 'https://www.emaar.com'),
  ('damac', 'DAMAC Properties', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200', 'DAMAC Properties is a luxury real estate developer based in Dubai, UAE.', 'https://www.damacproperties.com')
ON CONFLICT (slug) DO NOTHING;

-- Ensure we have the required areas
INSERT INTO areas (slug, name, image, starting_price, project_count, description) VALUES
  ('mina-rashid', 'Mina Rashid', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 1.5M', 5, 'Mina Rashid is a masterfully planned waterfront residential community at Port Rashid, Dubai.'),
  ('dubai-hills-estate', 'Dubai Hills Estate', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200', 'AED 1.2M', 15, 'Dubai Hills Estate is a premium golf course community with world-class amenities.'),
  ('damac-hills', 'Damac Hills', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 900K', 12, 'Damac Hills features luxury villas and apartments around a Trump International Golf Club.'),
  ('business-bay', 'Business Bay', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 800K', 20, 'Business Bay is Dubai''s central business district with stunning canal views.'),
  ('dubai-south', 'Dubai South', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 500K', 8, 'Dubai South is a master-planned city near Al Maktoum International Airport and Expo site.'),
  ('jumeirah-village-circle', 'Jumeirah Village Circle', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 600K', 25, 'JVC is a family-friendly community with affordable luxury living options.'),
  ('dubai-creek-harbour', 'Dubai Creek Harbour', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 1.4M', 10, 'Dubai Creek Harbour is a waterfront development featuring the iconic Dubai Creek Tower.'),
  ('akoya-oxygen', 'AKOYA Oxygen', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 700K', 8, 'AKOYA Oxygen is an eco-friendly green community with sustainable living.'),
  ('downtown-dubai', 'Downtown Dubai', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 2.5M', 15, 'Downtown Dubai is home to Burj Khalifa, Dubai Mall, and the Dubai Fountain.'),
  ('dubai-harbour', 'Dubai Harbour', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 2M', 6, 'Dubai Harbour is a premium waterfront destination with beach access and marina views.'),
  ('arabian-ranches-3', 'Arabian Ranches 3', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 1.8M', 8, 'Arabian Ranches 3 is a family community with townhouses and villas in a desert setting.'),
  ('emaar-south', 'Emaar South', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 'AED 1M', 6, 'Emaar South offers golf course living near the Expo 2020 site.'),
  ('creek-beach', 'Creek Beach', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'AED 1.6M', 5, 'Creek Beach offers resort-style living with direct beach access at Dubai Creek.')
ON CONFLICT (slug) DO NOTHING;

-- Get developer and area IDs for reference
-- We'll use subqueries to insert the projects

-- Insert Off-Plan Projects
INSERT INTO projects (slug, name, developer_id, area_id, location, price_from, starting_price, payment_plan, completion_date, handover, status, title_type, property_types, images, description, amenities, unit_types, bedrooms, match_score) VALUES

-- 1. Emaar Mina Rashid – Sirdhana Apartments
('emaar-sirdhana-apartments', 'Emaar Mina Rashid – Sirdhana Apartments',
  (SELECT id FROM developers WHERE slug = 'emaar'),
  (SELECT id FROM areas WHERE slug = 'mina-rashid'),
  'Mina Rashid, Dubai', 'AED 1.5M', 'AED 1,500,000', '60/40', 'Q4 2026', 'Q4 2026', 'Off Plan', 'Freehold',
  '["Apartment", "Penthouse"]',
  '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'A masterly planned waterfront residential community created through Emaar and DP World collaboration. Situated at Port Rashid, these waterfront residences emphasize contemporary interior design with floor-to-ceiling windows.',
  '["Gym", "Swimming Pool", "Private Garage", "Community Views", "Floor-to-ceiling Windows", "Waterfront Living"]',
  '[{"type": "1BR", "size": "750 sqft", "price": "AED 1.5M"}, {"type": "2BR", "size": "1100 sqft", "price": "AED 2.2M"}, {"type": "3BR", "size": "1500 sqft", "price": "AED 3.2M"}, {"type": "4BR Penthouse", "size": "2500 sqft", "price": "AED 5.5M"}]',
  4, 92),

-- 2. Park Ridge - Dubai Hills Estate
('emaar-park-ridge', 'Emaar Executive Residences II - Park Ridge',
  (SELECT id FROM developers WHERE slug = 'emaar'),
  (SELECT id FROM areas WHERE slug = 'dubai-hills-estate'),
  'Dubai Hills Estate, Dubai', 'AED 1.2M', 'AED 1,200,000', '70/30', 'Q2 2026', 'Q2 2026', 'Off Plan', 'Freehold',
  '["Apartment"]',
  '["https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200"]',
  'Global Free Zone benefits with 3-year visa included. Premium apartments in Dubai Hills Estate with park and golf course views.',
  '["Golf Course View", "Park View", "Gym", "Swimming Pool", "Kids Play Area", "24/7 Security"]',
  '[{"type": "1BR", "size": "680 sqft", "price": "AED 1.2M"}, {"type": "2BR", "size": "1050 sqft", "price": "AED 1.9M"}, {"type": "3BR", "size": "1450 sqft", "price": "AED 2.8M"}]',
  3, 88),

-- 3. Bella Vista Apartments - Damac Hills
('damac-bella-vista', 'Bella Vista Apartments',
  (SELECT id FROM developers WHERE slug = 'damac'),
  (SELECT id FROM areas WHERE slug = 'damac-hills'),
  'Damac Hills, Dubai', 'AED 900K', 'AED 900,000', '60/40', 'Q3 2025', 'Q3 2025', 'Off Plan', 'Freehold',
  '["Apartment"]',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'Surrounded by spectacular green fairways and world-class amenities in Damac Hills golf community.',
  '["Golf Course View", "Swimming Pool", "Gym", "Landscaped Gardens", "Clubhouse"]',
  '[{"type": "1BR", "size": "650 sqft", "price": "AED 900K"}, {"type": "2BR", "size": "950 sqft", "price": "AED 1.4M"}, {"type": "3BR", "size": "1300 sqft", "price": "AED 2.1M"}]',
  3, 85),

-- 4. Loreto - Damac Hills
('damac-loreto', 'Loreto Townhouses',
  (SELECT id FROM developers WHERE slug = 'damac'),
  (SELECT id FROM areas WHERE slug = 'damac-hills'),
  'Damac Hills, Dubai', 'AED 1.8M', 'AED 1,800,000', '50/50', 'Q4 2025', 'Q4 2025', 'Off Plan', 'Freehold',
  '["Townhouse"]',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'Townhouses in green enclave in The Park at Damac Hills. Family-oriented living with landscaped gardens.',
  '["Private Garden", "Golf Course", "Community Pool", "Kids Play Area", "BBQ Area"]',
  '[{"type": "3BR", "size": "2200 sqft", "price": "AED 1.8M"}, {"type": "4BR", "size": "2800 sqft", "price": "AED 2.5M"}]',
  4, 87),

-- 5. Damac Towers by Paramount
('damac-paramount-towers', 'Damac Towers by Paramount',
  (SELECT id FROM developers WHERE slug = 'damac'),
  (SELECT id FROM areas WHERE slug = 'business-bay'),
  'Business Bay, Dubai', 'AED 1.1M', 'AED 1,100,000', '60/40', 'Q1 2026', 'Q1 2026', 'Off Plan', 'Freehold',
  '["Apartment", "Penthouse"]',
  '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"]',
  'Four 270-meter towers with multi-level plaza and premium dining. Branded residences by Paramount Hotels.',
  '["Infinity Pool", "Spa", "Gym", "Cinema", "Valet Parking", "Concierge Service"]',
  '[{"type": "1BR", "size": "750 sqft", "price": "AED 1.1M"}, {"type": "2BR", "size": "1100 sqft", "price": "AED 1.8M"}, {"type": "3BR", "size": "1600 sqft", "price": "AED 2.9M"}]',
  3, 90),

-- 6. Aykon City - Business Bay
('aykon-city', 'Aykon City',
  NULL,
  (SELECT id FROM areas WHERE slug = 'business-bay'),
  'Business Bay, Dubai', 'AED 950K', 'AED 950,000', '70/30', 'Q2 2025', 'Q2 2025', 'Off Plan', 'Freehold',
  '["Apartment"]',
  '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"]',
  'Near Burj Khalifa and Dubai Fountains with stunning skyline vistas and premium interiors.',
  '["Burj Khalifa View", "Dubai Fountain View", "Infinity Pool", "Gym", "Spa"]',
  '[{"type": "1BR", "size": "700 sqft", "price": "AED 950K"}, {"type": "2BR", "size": "1000 sqft", "price": "AED 1.5M"}, {"type": "3BR", "size": "1400 sqft", "price": "AED 2.3M"}]',
  3, 86),

-- 7. 90210 Boutique Villas - Damac Hills
('damac-90210-villas', '90210 Boutique Villas',
  (SELECT id FROM developers WHERE slug = 'damac'),
  (SELECT id FROM areas WHERE slug = 'damac-hills'),
  'Damac Hills, Dubai', 'AED 3.5M', 'AED 3,500,000', '40/60', 'Q4 2025', 'Q4 2025', 'Off Plan', 'Freehold',
  '["Villa"]',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'Furnished luxury villas with PGA coaching and concierge services in Damac Hills.',
  '["Furnished", "PGA Golf Coaching", "Concierge Service", "Private Pool", "Smart Home"]',
  '[{"type": "4BR", "size": "4500 sqft", "price": "AED 3.5M"}, {"type": "5BR", "size": "5500 sqft", "price": "AED 4.5M"}, {"type": "6BR", "size": "7000 sqft", "price": "AED 6M"}]',
  6, 94),

-- 8. Creek Horizon - Dubai Creek Harbour
('emaar-creek-horizon', 'Creek Horizon',
  (SELECT id FROM developers WHERE slug = 'emaar'),
  (SELECT id FROM areas WHERE slug = 'dubai-creek-harbour'),
  'Dubai Creek Harbour, Dubai', 'AED 1.4M', 'AED 1,400,000', '60/40', 'Q3 2026', 'Q3 2026', 'Off Plan', 'Freehold',
  '["Apartment", "Penthouse"]',
  '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"]',
  'Penthouses and apartments by Emaar with stunning creek views and premium finishes.',
  '["Creek View", "Swimming Pool", "Gym", "Retail Podium", "Landscaped Gardens"]',
  '[{"type": "1BR", "size": "756 sqft", "price": "AED 1.4M"}, {"type": "2BR", "size": "1200 sqft", "price": "AED 2.2M"}, {"type": "3BR", "size": "1704 sqft", "price": "AED 3.2M"}]',
  3, 91),

-- 9. 17 ICON Bay - Dubai Creek Harbour
('icon-bay-17', '17 ICON Bay',
  NULL,
  (SELECT id FROM areas WHERE slug = 'dubai-creek-harbour'),
  'Dubai Creek Harbour, Dubai', 'AED 1.3M', 'AED 1,300,000', '60/40', 'Q2 2026', 'Q2 2026', 'Off Plan', 'Freehold',
  '["Apartment"]',
  '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"]',
  'Iconic tower at Dubai Creek Harbour with waterfront living and stunning views.',
  '["Waterfront", "Creek View", "Swimming Pool", "Gym", "Retail"]',
  '[{"type": "1BR", "size": "700 sqft", "price": "AED 1.3M"}, {"type": "2BR", "size": "1100 sqft", "price": "AED 2M"}, {"type": "3BR", "size": "1500 sqft", "price": "AED 2.9M"}]',
  3, 88),

-- 10. IL Primo - Downtown Dubai
('emaar-il-primo', 'IL Primo',
  (SELECT id FROM developers WHERE slug = 'emaar'),
  (SELECT id FROM areas WHERE slug = 'downtown-dubai'),
  'Downtown Dubai', 'AED 15M', 'AED 15,000,000', '40/60', 'Q4 2027', 'Q4 2027', 'Off Plan', 'Freehold',
  '["Apartment", "Penthouse"]',
  '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"]',
  'The 77-storey Il Primo rises in the heart of The Opera District, only steps away from the iconic Dubai Opera. Duplex units and spacious apartments.',
  '["Opera District", "Burj Khalifa View", "Duplex Units", "Premium Finishes", "Concierge", "Infinity Pool"]',
  '[{"type": "4BR", "size": "5200 sqft", "price": "AED 15M"}, {"type": "5BR", "size": "7000 sqft", "price": "AED 22M"}, {"type": "6BR Duplex", "size": "11400 sqft", "price": "AED 35M"}]',
  6, 96),

-- 11. Emaar Beach Vista - Dubai Harbour
('emaar-beach-vista', 'Emaar Beach Vista',
  (SELECT id FROM developers WHERE slug = 'emaar'),
  (SELECT id FROM areas WHERE slug = 'dubai-harbour'),
  'Dubai Harbour, Dubai', 'AED 2.5M', 'AED 2,500,000', '60/40', 'Q1 2026', 'Q1 2026', 'Off Plan', 'Freehold',
  '["Apartment"]',
  '["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"]',
  'Beachfront apartments at Dubai Harbour with direct beach access and marina views.',
  '["Beach Access", "Marina View", "Swimming Pool", "Gym", "Retail", "Palm View"]',
  '[{"type": "1BR", "size": "800 sqft", "price": "AED 2.5M"}, {"type": "2BR", "size": "1300 sqft", "price": "AED 3.8M"}, {"type": "3BR", "size": "1800 sqft", "price": "AED 5.2M"}, {"type": "4BR", "size": "2400 sqft", "price": "AED 7M"}]',
  4, 93),

-- 12. Joy Townhouses - Arabian Ranches 3
('emaar-joy-townhouses', 'Emaar Joy Townhouses',
  (SELECT id FROM developers WHERE slug = 'emaar'),
  (SELECT id FROM areas WHERE slug = 'arabian-ranches-3'),
  'Arabian Ranches 3, Dubai', 'AED 1.8M', 'AED 1,800,000', '50/50', 'Q3 2025', 'Q3 2025', 'Off Plan', 'Freehold',
  '["Townhouse"]',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'Family townhouses in Arabian Ranches 3 with parks and schools nearby.',
  '["Family Community", "Parks", "Schools Nearby", "Community Pool", "Jogging Tracks"]',
  '[{"type": "3BR", "size": "2100 sqft", "price": "AED 1.8M"}, {"type": "4BR", "size": "2700 sqft", "price": "AED 2.4M"}]',
  4, 87),

-- 13. Emaar South EXPO Golf Villas
('emaar-expo-golf-villas', 'Emaar South EXPO Golf Villas',
  (SELECT id FROM developers WHERE slug = 'emaar'),
  (SELECT id FROM areas WHERE slug = 'emaar-south'),
  'Emaar South, Dubai', 'AED 2.2M', 'AED 2,200,000', '50/50', 'Q4 2025', 'Q4 2025', 'Off Plan', 'Freehold',
  '["Villa"]',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'Golf villas near Expo site with championship golf course views.',
  '["Golf Course", "Near Expo", "Private Garden", "Community Pool", "Clubhouse"]',
  '[{"type": "3BR", "size": "2800 sqft", "price": "AED 2.2M"}, {"type": "4BR", "size": "3500 sqft", "price": "AED 3M"}, {"type": "5BR", "size": "4500 sqft", "price": "AED 4.2M"}]',
  5, 89),

-- 14. JustCavalli Villas - AKOYA Oxygen
('justcavalli-villas', 'JustCavalli Villas',
  NULL,
  (SELECT id FROM areas WHERE slug = 'akoya-oxygen'),
  'AKOYA Oxygen, Dubai', 'AED 2.8M', 'AED 2,800,000', '50/50', 'Q2 2026', 'Q2 2026', 'Off Plan', 'Freehold',
  '["Villa"]',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'Designer villas by Just Cavalli in green community with luxury finishes.',
  '["Designer Interiors", "Private Pool", "Smart Home", "Golf Course", "Green Community"]',
  '[{"type": "2BR", "size": "2200 sqft", "price": "AED 2.8M"}, {"type": "4BR", "size": "4000 sqft", "price": "AED 4.5M"}, {"type": "7BR", "size": "8000 sqft", "price": "AED 9M"}]',
  7, 91),

-- 15. Ghalia - JVC
('ghalia-jvc', 'Ghalia',
  NULL,
  (SELECT id FROM areas WHERE slug = 'jumeirah-village-circle'),
  'Jumeirah Village Circle, Dubai', 'AED 650K', 'AED 650,000', '70/30', 'Q4 2025', 'Q4 2025', 'Off Plan', 'Freehold',
  '["Apartment"]',
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]',
  'Holistic living experience in family-oriented JVC community with affordable luxury.',
  '["Family Community", "Swimming Pool", "Gym", "Kids Play Area", "Retail"]',
  '[{"type": "Studio", "size": "400 sqft", "price": "AED 650K"}, {"type": "1BR", "size": "650 sqft", "price": "AED 850K"}, {"type": "2BR", "size": "950 sqft", "price": "AED 1.2M"}]',
  2, 82)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_from = EXCLUDED.price_from,
  starting_price = EXCLUDED.starting_price,
  payment_plan = EXCLUDED.payment_plan,
  completion_date = EXCLUDED.completion_date,
  description = EXCLUDED.description,
  amenities = EXCLUDED.amenities,
  unit_types = EXCLUDED.unit_types,
  match_score = EXCLUDED.match_score,
  updated_at = CURRENT_TIMESTAMP;

-- Update area project counts
UPDATE areas SET project_count = (
  SELECT COUNT(*) FROM projects WHERE area_id = areas.id
);

-- Verify the data
SELECT
  p.name,
  d.name as developer,
  a.name as area,
  p.price_from,
  p.match_score
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN areas a ON p.area_id = a.id
WHERE p.status = 'Off Plan'
ORDER BY p.match_score DESC;
