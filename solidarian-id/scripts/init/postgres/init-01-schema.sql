-- =====================================================
-- PostgreSQL Database Schema
-- Generated: 2026-03-04T01:41:44.693Z
-- =====================================================

--
-- PostgreSQL database dump
--

\restrict 5FrGfOZpFGhi1UTeTx2IvWx3JxEpPiGxNJzx5fhehGAufX834he5biOxmBwUNSF

-- Dumped from database version 16.13 (Debian 16.13-1.pgdg13+1)
-- Dumped by pg_dump version 16.13 (Debian 16.13-1.pgdg13+1)

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
-- Name: community_user_role_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.community_user_role_enum AS ENUM (
    'creator',
    'admin',
    'member'
);


--
-- Name: requests_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.requests_status_enum AS ENUM (
    'approved',
    'pending',
    'rejected'
);


--
-- Name: requests_type_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.requests_type_enum AS ENUM (
    'community',
    'cause',
    'action'
);


SET default_table_access_method = heap;

--
-- Name: action; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.action (
    id character varying NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    "causeId" character varying NOT NULL
);


--
-- Name: cause; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cause (
    id character varying NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    "initialDate" timestamp with time zone NOT NULL,
    "durationDays" integer NOT NULL,
    ods text NOT NULL,
    "communityId" character varying NOT NULL
);


--
-- Name: cause_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cause_user (
    "causeId" character varying NOT NULL,
    "userId" character varying NOT NULL
);


--
-- Name: community; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.community (
    id character varying NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: community_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.community_user (
    "communityId" character varying NOT NULL,
    "userId" character varying NOT NULL,
    role public.community_user_role_enum DEFAULT 'member'::public.community_user_role_enum NOT NULL,
    "joinedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event (
    id character varying NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    "initialDate" timestamp with time zone NOT NULL,
    "actionId" character varying NOT NULL,
    "placeDirection" character varying NOT NULL,
    "placeCity" character varying NOT NULL,
    "placeCountrycode" character varying NOT NULL
);


--
-- Name: event_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_user (
    "eventId" character varying NOT NULL,
    "userId" character varying NOT NULL,
    email character varying,
    "mobilePhone" character varying,
    fullname character varying NOT NULL
);


--
-- Name: objective; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.objective (
    name character varying NOT NULL,
    "actionId" character varying NOT NULL,
    description character varying NOT NULL,
    quantity integer NOT NULL,
    unit character varying NOT NULL,
    "currentAmount" integer NOT NULL
);


--
-- Name: objective_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.objective_user (
    name character varying NOT NULL,
    "actionId" character varying NOT NULL,
    "userId" character varying NOT NULL,
    email character varying,
    "mobilePhone" character varying,
    fullname character varying NOT NULL
);


--
-- Name: requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.requests (
    id uuid NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    reason text,
    status public.requests_status_enum NOT NULL,
    type public.requests_type_enum NOT NULL,
    user_id character varying
);


--
-- Name: tbl_Usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tbl_Usuarios" (
    "Id" uuid NOT NULL,
    "FullName" character varying NOT NULL,
    "MobilePhone" character varying NOT NULL,
    "Username" character varying NOT NULL,
    "PasswordHash" character varying NOT NULL,
    "City" character varying NOT NULL,
    "CountryCode" character varying(2) NOT NULL
);


--
-- Name: typeorm_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typeorm_migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


--
-- Name: typeorm_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.typeorm_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: typeorm_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.typeorm_migrations_id_seq OWNED BY public.typeorm_migrations.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id character varying NOT NULL,
    "fullName" character varying NOT NULL,
    "mobilePhone" character varying,
    email character varying
);


--
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_preferences (
    user_id uuid NOT NULL,
    preferred_sdgs integer[] DEFAULT '{}'::integer[] NOT NULL,
    preferred_categories text[] DEFAULT '{}'::text[] NOT NULL,
    duration_preferences text[] DEFAULT '{any}'::text[] NOT NULL,
    notifications_enabled boolean DEFAULT true NOT NULL
);


--
-- Name: typeorm_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typeorm_migrations ALTER COLUMN id SET DEFAULT nextval('public.typeorm_migrations_id_seq'::regclass);


--
-- Name: requests PK_0428f484e96f9e6a55955f29b5f; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY (id);


--
-- Name: action PK_2d9db9cf5edfbbae74eb56e3a39; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY (id);


--
-- Name: event PK_30c2f3bbaf6d34a55f8ae6e4614; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY (id);


--
-- Name: user_preferences PK_458057fa75b66e68a275647da2e; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "PK_458057fa75b66e68a275647da2e" PRIMARY KEY (user_id);


--
-- Name: objective_user PK_7538a84f24015b7e8b424a264b6; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objective_user
    ADD CONSTRAINT "PK_7538a84f24015b7e8b424a264b6" PRIMARY KEY (name, "actionId", "userId");


--
-- Name: cause_user PK_7944411ff0f9293259e4c27a633; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cause_user
    ADD CONSTRAINT "PK_7944411ff0f9293259e4c27a633" PRIMARY KEY ("causeId", "userId");


--
-- Name: cause PK_7e5e70955edaf3bb0c56d8eeb49; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cause
    ADD CONSTRAINT "PK_7e5e70955edaf3bb0c56d8eeb49" PRIMARY KEY (id);


--
-- Name: objective PK_960cdbbf9e380bcfccdc088fdf1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objective
    ADD CONSTRAINT "PK_960cdbbf9e380bcfccdc088fdf1" PRIMARY KEY (name, "actionId");


--
-- Name: typeorm_migrations PK_bb2f075707dd300ba86d0208923; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.typeorm_migrations
    ADD CONSTRAINT "PK_bb2f075707dd300ba86d0208923" PRIMARY KEY (id);


--
-- Name: community_user PK_bd372ac34825213b0ccb110c859; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_user
    ADD CONSTRAINT "PK_bd372ac34825213b0ccb110c859" PRIMARY KEY ("communityId", "userId");


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: community PK_cae794115a383328e8923de4193; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community
    ADD CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY (id);


--
-- Name: tbl_Usuarios PK_d5f9a0542e74e8cc4658f565411; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tbl_Usuarios"
    ADD CONSTRAINT "PK_d5f9a0542e74e8cc4658f565411" PRIMARY KEY ("Id");


--
-- Name: event_user PK_eb84a91a104e413c2ced7ee4934; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_user
    ADD CONSTRAINT "PK_eb84a91a104e413c2ced7ee4934" PRIMARY KEY ("eventId", "userId");


--
-- Name: tbl_Usuarios UQ_120aab196d9c98bc86e66d46387; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tbl_Usuarios"
    ADD CONSTRAINT "UQ_120aab196d9c98bc86e66d46387" UNIQUE ("Username");


--
-- Name: tbl_Usuarios UQ_d567e4a674f3cc02c92efa2407c; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."tbl_Usuarios"
    ADD CONSTRAINT "UQ_d567e4a674f3cc02c92efa2407c" UNIQUE ("MobilePhone");


--
-- Name: IDX_7538a84f24015b7e8b424a264b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_7538a84f24015b7e8b424a264b" ON public.objective_user USING btree (name, "actionId", "userId");


--
-- Name: IDX_7944411ff0f9293259e4c27a63; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_7944411ff0f9293259e4c27a63" ON public.cause_user USING btree ("causeId", "userId");


--
-- Name: IDX_eb84a91a104e413c2ced7ee493; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_eb84a91a104e413c2ced7ee493" ON public.event_user USING btree ("eventId", "userId");


--
-- Name: IDX_f9bc5c9c1155949ea5a5af2806; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_f9bc5c9c1155949ea5a5af2806" ON public.community_user USING btree ("communityId", "userId", role);


--
-- Name: objective FK_1ae66f2ebd41ed4a6dfd2b0c4af; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objective
    ADD CONSTRAINT "FK_1ae66f2ebd41ed4a6dfd2b0c4af" FOREIGN KEY ("actionId") REFERENCES public.action(id);


--
-- Name: user_preferences FK_458057fa75b66e68a275647da2e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT "FK_458057fa75b66e68a275647da2e" FOREIGN KEY (user_id) REFERENCES public."tbl_Usuarios"("Id");


--
-- Name: cause_user FK_4fe651b6ac8d674480c650deaef; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cause_user
    ADD CONSTRAINT "FK_4fe651b6ac8d674480c650deaef" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: event_user FK_600a6c0ba1ff979f6bfbce3bfe3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_user
    ADD CONSTRAINT "FK_600a6c0ba1ff979f6bfbce3bfe3" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: cause_user FK_61248b84682b564af449c4b0ddb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cause_user
    ADD CONSTRAINT "FK_61248b84682b564af449c4b0ddb" FOREIGN KEY ("causeId") REFERENCES public.cause(id) ON DELETE CASCADE;


--
-- Name: event_user FK_6e3fbcc18ab70b803bb82f8802c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_user
    ADD CONSTRAINT "FK_6e3fbcc18ab70b803bb82f8802c" FOREIGN KEY ("eventId") REFERENCES public.event(id) ON DELETE CASCADE;


--
-- Name: community_user FK_7ebd3469ae3f0c64129af3cc6a5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_user
    ADD CONSTRAINT "FK_7ebd3469ae3f0c64129af3cc6a5" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: objective_user FK_899e10c88c5ebae76d685200cad; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objective_user
    ADD CONSTRAINT "FK_899e10c88c5ebae76d685200cad" FOREIGN KEY (name, "actionId") REFERENCES public.objective(name, "actionId") ON DELETE CASCADE;


--
-- Name: objective_user FK_92c6c338535abf446d8faddecf1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objective_user
    ADD CONSTRAINT "FK_92c6c338535abf446d8faddecf1" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: requests FK_9e5e2eb56e3837b43e5a547be23; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: action FK_df62c1a425c1654f419a005158e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT "FK_df62c1a425c1654f419a005158e" FOREIGN KEY ("causeId") REFERENCES public.cause(id);


--
-- Name: cause FK_ebce3fbf3f5903567419e99e5f7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cause
    ADD CONSTRAINT "FK_ebce3fbf3f5903567419e99e5f7" FOREIGN KEY ("communityId") REFERENCES public.community(id);


--
-- Name: community_user FK_fab8516524e4728bb788da6a924; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_user
    ADD CONSTRAINT "FK_fab8516524e4728bb788da6a924" FOREIGN KEY ("communityId") REFERENCES public.community(id) ON DELETE CASCADE;


--
-- Name: event FK_feac1a9ec183e786269d10844d9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT "FK_feac1a9ec183e786269d10844d9" FOREIGN KEY ("actionId") REFERENCES public.action(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 5FrGfOZpFGhi1UTeTx2IvWx3JxEpPiGxNJzx5fhehGAufX834he5biOxmBwUNSF

