--
-- PostgreSQL database dump
--

\restrict zT3JLgm8Iv49tbUhkJlFdWBIAGUWV8boMleBdMkgBx2JMskALprddhsZAbSmYEE

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


--
-- Name: area_stats; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.area_stats AS
SELECT
    NULL::integer AS id,
    NULL::character varying(255) AS slug,
    NULL::character varying(255) AS name,
    NULL::text AS image,
    NULL::character varying(100) AS starting_price,
    NULL::integer AS project_count,
    NULL::text AS description,
    NULL::timestamp without time zone AS created_at,
    NULL::timestamp without time zone AS updated_at,
    NULL::bigint AS actual_project_count,
    NULL::integer AS min_price;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: areas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.areas (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    image text NOT NULL,
    starting_price character varying(100) NOT NULL,
    project_count integer DEFAULT 0,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: areas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.areas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: areas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.areas_id_seq OWNED BY public.areas.id;


--
-- Name: chat_conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chat_conversations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    session_id text NOT NULL,
    messages jsonb DEFAULT '[]'::jsonb,
    recommended_properties jsonb DEFAULT '[]'::jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: developers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.developers (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    logo text,
    description text,
    website character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: developers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.developers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: developers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.developers_id_seq OWNED BY public.developers.id;


--
-- Name: neighborhoods; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.neighborhoods (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    district text NOT NULL,
    description text,
    images jsonb DEFAULT '[]'::jsonb,
    average_price numeric,
    property_count integer DEFAULT 0,
    amenities jsonb DEFAULT '[]'::jsonb,
    latitude numeric,
    longitude numeric,
    popularity_score integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    developer_id integer,
    area_id integer,
    location character varying(255) NOT NULL,
    price_from character varying(100) NOT NULL,
    starting_price character varying(100),
    payment_plan character varying(50),
    completion_date character varying(50),
    handover character varying(50),
    status character varying(50) DEFAULT 'Off Plan'::character varying,
    title_type character varying(50) DEFAULT 'Freehold'::character varying,
    property_types jsonb DEFAULT '[]'::jsonb,
    images jsonb DEFAULT '[]'::jsonb,
    description text NOT NULL,
    amenities jsonb DEFAULT '[]'::jsonb,
    payment_plans jsonb DEFAULT '[]'::jsonb,
    unit_types jsonb DEFAULT '[]'::jsonb,
    bedrooms integer,
    bathrooms integer,
    sqft integer,
    match_score integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: projects_with_details; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.projects_with_details AS
 SELECT p.id,
    p.slug,
    p.name,
    p.developer_id,
    p.area_id,
    p.location,
    p.price_from,
    p.starting_price,
    p.payment_plan,
    p.completion_date,
    p.handover,
    p.status,
    p.title_type,
    p.property_types,
    p.images,
    p.description,
    p.amenities,
    p.payment_plans,
    p.unit_types,
    p.bedrooms,
    p.bathrooms,
    p.sqft,
    p.match_score,
    p.created_at,
    p.updated_at,
    d.name AS developer_name,
    d.logo AS developer_logo,
    a.name AS area_name,
    a.slug AS area_slug
   FROM ((public.projects p
     LEFT JOIN public.developers d ON ((p.developer_id = d.id)))
     LEFT JOIN public.areas a ON ((p.area_id = a.id)));


--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    external_id text,
    source text,
    source_url text,
    title text NOT NULL,
    description text,
    property_type text NOT NULL,
    status text NOT NULL,
    price numeric NOT NULL,
    bedrooms integer NOT NULL,
    bathrooms integer NOT NULL,
    size_sqft integer NOT NULL,
    furnished boolean DEFAULT false,
    neighborhood text NOT NULL,
    district text NOT NULL,
    city text DEFAULT 'Dubai'::text NOT NULL,
    latitude numeric,
    longitude numeric,
    images jsonb DEFAULT '[]'::jsonb,
    amenities jsonb DEFAULT '[]'::jsonb,
    features jsonb DEFAULT '[]'::jsonb,
    tags jsonb DEFAULT '[]'::jsonb,
    agent_name text,
    agent_phone text,
    agent_email text,
    agent_agency text,
    is_active boolean DEFAULT true,
    view_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_synced_at timestamp with time zone,
    CONSTRAINT properties_property_type_check CHECK ((property_type = ANY (ARRAY['apartment'::text, 'villa'::text, 'townhouse'::text, 'penthouse'::text]))),
    CONSTRAINT properties_source_check CHECK ((source = ANY (ARRAY['bayut'::text, 'propertyFinder'::text, 'dubizzle'::text]))),
    CONSTRAINT properties_status_check CHECK ((status = ANY (ARRAY['sale'::text, 'rent'::text])))
);


--
-- Name: property_views; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.property_views (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    property_id uuid,
    user_session_id text,
    viewed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    source text,
    CONSTRAINT property_views_source_check CHECK ((source = ANY (ARRAY['search'::text, 'recommendation'::text, 'chat'::text, 'direct'::text])))
);


--
-- Name: areas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas ALTER COLUMN id SET DEFAULT nextval('public.areas_id_seq'::regclass);


--
-- Name: developers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.developers ALTER COLUMN id SET DEFAULT nextval('public.developers_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id);


--
-- Name: areas areas_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_slug_key UNIQUE (slug);


--
-- Name: chat_conversations chat_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_conversations
    ADD CONSTRAINT chat_conversations_pkey PRIMARY KEY (id);


--
-- Name: chat_conversations chat_conversations_session_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_conversations
    ADD CONSTRAINT chat_conversations_session_id_key UNIQUE (session_id);


--
-- Name: developers developers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_pkey PRIMARY KEY (id);


--
-- Name: developers developers_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT developers_slug_key UNIQUE (slug);


--
-- Name: neighborhoods neighborhoods_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.neighborhoods
    ADD CONSTRAINT neighborhoods_name_key UNIQUE (name);


--
-- Name: neighborhoods neighborhoods_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.neighborhoods
    ADD CONSTRAINT neighborhoods_pkey PRIMARY KEY (id);


--
-- Name: neighborhoods neighborhoods_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.neighborhoods
    ADD CONSTRAINT neighborhoods_slug_key UNIQUE (slug);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_key UNIQUE (slug);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: property_views property_views_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_views
    ADD CONSTRAINT property_views_pkey PRIMARY KEY (id);


--
-- Name: idx_areas_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_areas_slug ON public.areas USING btree (slug);


--
-- Name: idx_chat_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chat_session_id ON public.chat_conversations USING btree (session_id);


--
-- Name: idx_developers_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_developers_slug ON public.developers USING btree (slug);


--
-- Name: idx_projects_area_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_area_id ON public.projects USING btree (area_id);


--
-- Name: idx_projects_developer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_developer_id ON public.projects USING btree (developer_id);


--
-- Name: idx_projects_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_slug ON public.projects USING btree (slug);


--
-- Name: idx_projects_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_status ON public.projects USING btree (status);


--
-- Name: idx_properties_bedrooms; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_bedrooms ON public.properties USING btree (bedrooms);


--
-- Name: idx_properties_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_created_at ON public.properties USING btree (created_at DESC);


--
-- Name: idx_properties_is_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_is_active ON public.properties USING btree (is_active);


--
-- Name: idx_properties_neighborhood; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_neighborhood ON public.properties USING btree (neighborhood);


--
-- Name: idx_properties_price; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_price ON public.properties USING btree (price);


--
-- Name: idx_properties_property_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_property_type ON public.properties USING btree (property_type);


--
-- Name: idx_properties_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_status ON public.properties USING btree (status);


--
-- Name: idx_property_views_property_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_property_views_property_id ON public.property_views USING btree (property_id);


--
-- Name: area_stats _RETURN; Type: RULE; Schema: public; Owner: -
--

CREATE OR REPLACE VIEW public.area_stats AS
 SELECT a.id,
    a.slug,
    a.name,
    a.image,
    a.starting_price,
    a.project_count,
    a.description,
    a.created_at,
    a.updated_at,
    count(p.id) AS actual_project_count,
    min((replace(replace((p.price_from)::text, 'AED '::text, ''::text), 'K'::text, '000'::text))::integer) AS min_price
   FROM (public.areas a
     LEFT JOIN public.projects p ON ((a.id = p.area_id)))
  GROUP BY a.id;


--
-- Name: areas update_areas_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON public.areas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: chat_conversations update_chat_conversations_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_chat_conversations_updated_at BEFORE UPDATE ON public.chat_conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: developers update_developers_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_developers_updated_at BEFORE UPDATE ON public.developers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: neighborhoods update_neighborhoods_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_neighborhoods_updated_at BEFORE UPDATE ON public.neighborhoods FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: projects update_projects_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: properties update_properties_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: projects projects_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_area_id_fkey FOREIGN KEY (area_id) REFERENCES public.areas(id) ON DELETE CASCADE;


--
-- Name: projects projects_developer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_developer_id_fkey FOREIGN KEY (developer_id) REFERENCES public.developers(id) ON DELETE SET NULL;


--
-- Name: property_views property_views_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_views
    ADD CONSTRAINT property_views_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zT3JLgm8Iv49tbUhkJlFdWBIAGUWV8boMleBdMkgBx2JMskALprddhsZAbSmYEE

