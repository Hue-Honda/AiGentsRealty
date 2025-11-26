--
-- PostgreSQL database dump
--

\restrict Ay4fp8EsHrAIbTmhaiKDxGQCgIwx3TorkVIF0VjyEDV3M21sYMapPG1p7gd4idk

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: areas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.areas (id, slug, name, image, starting_price, project_count, description, created_at, updated_at) FROM stdin;
1	dubai-design-district-dubai	Dubai Design District (d3)	https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop	AED 1,200,000	12	Known for its iconic landmarks and creative atmosphere, this vibrant community features a diverse selection of properties.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
2	dubai-hills-estate	Dubai Hills Estate	https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop	AED 900,000	45	A master-planned community offering luxury living with world-class amenities and stunning views of Dubai skyline.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
3	dubai-marina	Dubai Marina	https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop	AED 1,100,000	88	Waterfront living at its finest with stunning marina views, dining, and entertainment options.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
4	palm-jumeirah	Palm Jumeirah	https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop	AED 2,500,000	34	The iconic man-made island offering exclusive beachfront properties and luxury residences.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
5	downtown-dubai	Downtown Dubai	https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop	AED 1,500,000	67	The heart of Dubai featuring Burj Khalifa, Dubai Mall, and world-class urban living.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
6	business-bay	Business Bay	https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop	AED 950,000	92	Central business district with modern skyscrapers and canal views, perfect for professionals.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
7	dubai-creek-harbour	Dubai Creek Harbour	https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop	AED 1,200,000	28	A new waterfront destination combining heritage with modern living and investment opportunities.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
8	jumeirah-village-circle	Jumeirah Village Circle (JVC)	https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop	AED 650,000	343	Family-friendly community with affordable housing options and excellent connectivity.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
9	arabian-ranches	Arabian Ranches	https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop	AED 1,800,000	23	Desert-themed community offering spacious villas and a peaceful family lifestyle.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
10	bluewaters-island	Bluewaters Island	https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop	AED 2,200,000	8	Modern island living with Ain Dubai as the centerpiece and beachfront access.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
11	dubai-south	Dubai South	https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop	AED 550,000	42	Future-focused development near Al Maktoum International Airport with affordable options.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
12	al-furjan	Al Furjan	https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop	AED 1,100,000	18	Well-connected family community with modern amenities and metro accessibility.	2025-11-25 06:42:36.046626	2025-11-25 06:42:36.046626
\.


--
-- Data for Name: chat_conversations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chat_conversations (id, session_id, messages, recommended_properties, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: developers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.developers (id, slug, name, logo, description, website, created_at, updated_at) FROM stdin;
1	emaar-properties	Emaar Properties	https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop	Leading real estate developer in Dubai, known for iconic projects like Burj Khalifa and Dubai Mall.	\N	2025-11-25 06:42:36.049844	2025-11-25 06:42:36.049844
2	damac-properties	DAMAC Properties	https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop	Luxury property developer specializing in high-end residential and commercial projects.	\N	2025-11-25 06:42:36.049844	2025-11-25 06:42:36.049844
3	meraas	Meraas	https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop	Dubai-based holding company creating lifestyle destinations and communities.	\N	2025-11-25 06:42:36.049844	2025-11-25 06:42:36.049844
4	nakheel	Nakheel	https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop	Master developer behind Palm Jumeirah and other iconic Dubai developments.	\N	2025-11-25 06:42:36.049844	2025-11-25 06:42:36.049844
5	sobha-realty	Sobha Realty	https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop	Premium real estate developer focusing on quality and craftsmanship.	\N	2025-11-25 06:42:36.049844	2025-11-25 06:42:36.049844
\.


--
-- Data for Name: neighborhoods; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.neighborhoods (id, name, slug, district, description, images, average_price, property_count, amenities, latitude, longitude, popularity_score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, slug, name, developer_id, area_id, location, price_from, starting_price, payment_plan, completion_date, handover, status, title_type, property_types, images, description, amenities, payment_plans, unit_types, bedrooms, bathrooms, sqft, match_score, created_at, updated_at) FROM stdin;
1	azure-residences	Azure Residences	1	2	Dubai Hills Estate	AED 900K	AED 900,000	80/20	Q4 2025	Q2 2027	Off Plan	Freehold	["Apartments", "Penthouses"]	["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop"]	Azure Residences represents the pinnacle of luxury living in Dubai Hills Estate. This exceptional development by Emaar Properties offers meticulously designed residences with breathtaking views and world-class amenities.	["Swimming Pool", "Fitness Center", "Kids Play Area", "BBQ Area", "Landscaped Gardens", "Security 24/7", "Covered Parking", "Concierge Service", "Yoga Deck", "Jogging Track", "Steam & Sauna", "Multi-purpose Hall"]	[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 60}, {"stage": "On Handover", "percentage": 20}]	[{"size": "450 sqft", "type": "Studio", "price": "AED 650K"}, {"size": "750 sqft", "type": "1 Bedroom", "price": "AED 900K"}, {"size": "1,200 sqft", "type": "2 Bedroom", "price": "AED 1.4M"}, {"size": "1,800 sqft", "type": "3 Bedroom", "price": "AED 2.1M"}, {"size": "3,500 sqft", "type": "Penthouse", "price": "AED 5.5M"}]	2	2	1200	95	2025-11-25 06:42:36.052288	2025-11-25 06:42:36.052288
2	marina-heights	Marina Heights	2	3	Dubai Marina	AED 1.2M	AED 1,200,000	10/70/20	Q4 2026	Q4 2026	Off Plan	Freehold	["Apartments", "Penthouses"]	["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]	Marina Heights offers stunning waterfront living with panoramic views of Dubai Marina. Premium apartments with luxury finishes and world-class amenities.	["Infinity Pool", "Gym", "Marina Walk Access", "Retail Outlets", "Valet Parking", "Concierge", "Kids Area"]	[{"stage": "On Booking", "percentage": 10}, {"stage": "During Construction", "percentage": 70}, {"stage": "On Handover", "percentage": 20}]	[{"size": "850 sqft", "type": "1 Bedroom", "price": "AED 1.2M"}, {"size": "1,400 sqft", "type": "2 Bedroom", "price": "AED 1.8M"}, {"size": "2,000 sqft", "type": "3 Bedroom", "price": "AED 2.5M"}]	3	3	1800	92	2025-11-25 06:42:36.058411	2025-11-25 06:42:36.058411
3	palm-gardens	Palm Gardens	4	4	Palm Jumeirah	AED 2.5M	AED 2,500,000	20/60/20	Q1 2028	Q1 2028	Off Plan	Freehold	["Villas", "Townhouses"]	["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop"]	Exclusive beachfront living on the iconic Palm Jumeirah. Luxury villas with private beach access and stunning Arabian Gulf views.	["Private Beach", "Beach Club", "Infinity Pool", "Spa", "Gym", "Restaurants", "Valet Parking", "Security 24/7"]	[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 60}, {"stage": "On Handover", "percentage": 20}]	[{"size": "2,500 sqft", "type": "3 Bedroom Villa", "price": "AED 2.5M"}, {"size": "3,500 sqft", "type": "4 Bedroom Villa", "price": "AED 4.2M"}, {"size": "5,000 sqft", "type": "5 Bedroom Villa", "price": "AED 6.5M"}]	4	4	3000	88	2025-11-25 06:42:36.060261	2025-11-25 06:42:36.060261
4	creek-views	Creek Views	1	7	Dubai Creek Harbour	AED 1.8M	AED 1,800,000	20/40/40	Q3 2027	Q3 2027	Off Plan	Freehold	["Apartments"]	["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]	Modern waterfront living with views of Dubai Creek Tower. Contemporary design with premium amenities and excellent connectivity.	["Creek Views", "Swimming Pool", "Gym", "Running Track", "Parks", "Retail", "Schools Nearby"]	[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 40}, {"stage": "On Handover", "percentage": 40}]	[{"size": "800 sqft", "type": "1 Bedroom", "price": "AED 1.1M"}, {"size": "1,300 sqft", "type": "2 Bedroom", "price": "AED 1.8M"}, {"size": "1,900 sqft", "type": "3 Bedroom", "price": "AED 2.4M"}]	3	2	1600	85	2025-11-25 06:42:36.062225	2025-11-25 06:42:36.062225
5	downtown-elite	Downtown Elite	1	5	Downtown Dubai	AED 1.5M	AED 1,500,000	20/55/25	Q1 2027	Q1 2027	Off Plan	Freehold	["Apartments", "Penthouses"]	["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]	Premium living in the heart of Dubai with Burj Khalifa views. Steps away from Dubai Mall and world-class entertainment.	["Burj Khalifa Views", "Infinity Pool", "Sky Lounge", "Gym", "Valet Parking", "Concierge", "Dubai Mall Access"]	[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 55}, {"stage": "On Handover", "percentage": 25}]	[{"size": "900 sqft", "type": "1 Bedroom", "price": "AED 1.5M"}, {"size": "1,400 sqft", "type": "2 Bedroom", "price": "AED 2.2M"}, {"size": "2,100 sqft", "type": "3 Bedroom", "price": "AED 3.5M"}]	2	2	1400	90	2025-11-25 06:42:36.064311	2025-11-25 06:42:36.064311
6	business-bay-tower	Business Bay Tower	2	6	Business Bay	AED 1.1M	AED 1,100,000	20/50/30	Q2 2028	Q2 2028	Off Plan	Freehold	["Apartments"]	["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop"]	Modern business district living with canal views. Perfect for professionals seeking luxury and convenience in central Dubai.	["Canal Views", "Pool", "Gym", "Business Center", "Metro Access", "Retail Podium", "Parking"]	[{"stage": "On Booking", "percentage": 20}, {"stage": "During Construction", "percentage": 50}, {"stage": "On Handover", "percentage": 30}]	[{"size": "500 sqft", "type": "Studio", "price": "AED 750K"}, {"size": "800 sqft", "type": "1 Bedroom", "price": "AED 1.1M"}, {"size": "1,200 sqft", "type": "2 Bedroom", "price": "AED 1.6M"}]	2	2	1100	87	2025-11-25 06:42:36.066188	2025-11-25 06:42:36.066188
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.properties (id, external_id, source, source_url, title, description, property_type, status, price, bedrooms, bathrooms, size_sqft, furnished, neighborhood, district, city, latitude, longitude, images, amenities, features, tags, agent_name, agent_phone, agent_email, agent_agency, is_active, view_count, created_at, updated_at, last_synced_at) FROM stdin;
\.


--
-- Data for Name: property_views; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.property_views (id, property_id, user_session_id, viewed_at, source) FROM stdin;
\.


--
-- Name: areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.areas_id_seq', 12, true);


--
-- Name: developers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.developers_id_seq', 5, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_id_seq', 6, true);


--
-- PostgreSQL database dump complete
--

\unrestrict Ay4fp8EsHrAIbTmhaiKDxGQCgIwx3TorkVIF0VjyEDV3M21sYMapPG1p7gd4idk

