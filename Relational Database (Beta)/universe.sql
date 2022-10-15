--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

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

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(30) NOT NULL,
    is_coming boolean NOT NULL,
    distance_from_earth_in_km numeric(18,2) NOT NULL,
    galaxy_id integer
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_asteroid_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    age_in_m_years integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    galaxy_type character varying(30) NOT NULL,
    distance_from_earth numeric(18,2) NOT NULL,
    galaxy_id integer NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    has_life boolean,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    age_in_m_years integer,
    name character varying(30) NOT NULL,
    description text,
    gas_planet boolean NOT NULL,
    has_life boolean,
    distance_from_earth_in_ua numeric(18,2) NOT NULL,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    age_in_m_years integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    distance_from_earth numeric(18,2) NOT NULL,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, '2019 OK', false, 65000.00, 1);
INSERT INTO public.asteroid VALUES (2, '4 Vesta', false, 215255024.00, 1);
INSERT INTO public.asteroid VALUES (3, 'Psyche', false, 497000000.00, 1);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (12880, 'IOK-1', 'Seventh oldest', 'Lyman-alpha emitter', 95841442979.00, 4);
INSERT INTO public.galaxy VALUES (13400, 'GN-z11', 'The oldest we know', 'Irregular', 152712873942.00, 5);
INSERT INTO public.galaxy VALUES (13130, 'EGS-zs8-1', 'The second oldest we know', 'Lyman-break galaxy', 106444591125.00, 6);
INSERT INTO public.galaxy VALUES (13610, 'Milky Way', 'The galaxy where earth rests', 'Barred spiral', 0.00, 1);
INSERT INTO public.galaxy VALUES (10000, 'Andromeda', 'Our closest ally', 'Barred spiral', 2500000.00, 2);
INSERT INTO public.galaxy VALUES (400, 'Whirlpool Galaxy', 'The easiest galaxy to see', 'Interacting spiral', 23000000.00, 3);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 'The only moon we ever went', false, 3);
INSERT INTO public.moon VALUES (2, 'Delmos', 'Smaller moon of mars', false, 2);
INSERT INTO public.moon VALUES (3, 'Phobos', 'Biggest moon of mars', false, 2);
INSERT INTO public.moon VALUES (4, 'IO', 'Has volcanoes that we can see from earth', false, 5);
INSERT INTO public.moon VALUES (5, 'Europa', 'Solid water surface', false, 5);
INSERT INTO public.moon VALUES (6, 'Ganymede', 'Possible primitive life', NULL, 5);
INSERT INTO public.moon VALUES (7, 'Calisto', 'Second largest moon of Jupyter', false, 5);
INSERT INTO public.moon VALUES (8, 'Enceladus', 'Most reflective surface of the solar system', false, 6);
INSERT INTO public.moon VALUES (9, 'Titan', 'Maybe well go live there someday', NULL, 6);
INSERT INTO public.moon VALUES (10, 'Dione', 'Named after King Louis XIV', false, 6);
INSERT INTO public.moon VALUES (11, 'Epimetheus', 'A potato shaped moon', false, 6);
INSERT INTO public.moon VALUES (12, 'Daphnis', 'Named after the son of Hermes', false, 6);
INSERT INTO public.moon VALUES (13, 'Oberon', 'Second largest of Uranus moons', false, 7);
INSERT INTO public.moon VALUES (14, 'Puck', 'One of the smaller Uranus moons', false, 7);
INSERT INTO public.moon VALUES (15, 'Ariel', 'Surface is the youngest of Uranus moons', false, 7);
INSERT INTO public.moon VALUES (16, 'Titania', 'Uranus largest moon', false, 7);
INSERT INTO public.moon VALUES (17, 'Umbriel', 'Darkest of Uranus moons', false, 7);
INSERT INTO public.moon VALUES (18, 'Triton', 'Largest Neptune moon', false, 8);
INSERT INTO public.moon VALUES (19, 'Larissa', 'Neptune gravity will probabaly destroy this little moon', false, 8);
INSERT INTO public.moon VALUES (20, 'Charon', 'Largest Pluto moon', false, 9);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 4600, 'Mercury', 'Closest planet to the Sun', false, false, 0.52, 4);
INSERT INTO public.planet VALUES (2, 4600, 'Mars', 'The red planet', false, false, 1.51, 4);
INSERT INTO public.planet VALUES (3, 4600, 'Earth', 'Our planet', false, true, 0.00, 4);
INSERT INTO public.planet VALUES (4, 4600, 'Venus', 'The green one', false, false, 1.73, 4);
INSERT INTO public.planet VALUES (5, 4600, 'Jupyter', 'The big one', true, false, 4.78, 4);
INSERT INTO public.planet VALUES (6, 4600, 'Saturn', 'The one with many rings', true, false, 9.36, 4);
INSERT INTO public.planet VALUES (7, 4600, 'Uranus', 'The realy blue one', true, false, 20.05, 4);
INSERT INTO public.planet VALUES (8, 4600, 'Neptune', 'The not so blue one', true, false, 30.08, 4);
INSERT INTO public.planet VALUES (9, 4600, 'Pluto', 'IT IS A PLANET', false, false, 50.13, 4);
INSERT INTO public.planet VALUES (10, NULL, 'Proxima Centauri b', 'Super earth in close to Proxima Centauri', false, NULL, 26561250.00, 3);
INSERT INTO public.planet VALUES (11, NULL, '136199 Eris', 'A dwarf planet further than pluto', false, false, 40.00, 4);
INSERT INTO public.planet VALUES (12, NULL, 'Ceres', 'A dwarf planet relatively close', false, false, 3.00, 4);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 6800, 'Alpha Centauri A', 'Biggest of the Alpha Centauri System', 4.37, 1);
INSERT INTO public.star VALUES (2, 6800, 'Alpha Centauri B', 'Smallest of the Alpha Centauri System', 4.37, 1);
INSERT INTO public.star VALUES (3, 6800, 'Proxima Centauri', 'Brightest of the Alpha Centauri System', 4.22, 1);
INSERT INTO public.star VALUES (4, 5000, 'Sun', 'Our lovely star', 0.00, 1);
INSERT INTO public.star VALUES (5, 10000, 'Bernards Star', 'Second close to the sun', 6.00, 1);
INSERT INTO public.star VALUES (6, 350, 'Wolf 359', 'Thirdest close to the sun', 7.80, 1);


--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_asteroid_id_seq', 3, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid asteroid_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_key UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: asteroid asteroid_unq; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_unq UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: galaxy galaxy_unq; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_unq UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: moon moon_unq; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_unq UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: planet planet_unq; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_unq UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_unq; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_unq UNIQUE (name);


--
-- Name: asteroid asteroid_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

