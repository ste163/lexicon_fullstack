-- this code should be run within Uffizzi's Adminer
-- will have to manually add the UNIQUE on email
-- and all foreign key relationships

-- USER TABLE
DROP TABLE IF EXISTS "user";
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "firebaseUserId" character varying(28) NOT NULL,
    "email" character varying(555) NOT NULL,
    CONSTRAINT "user_id" PRIMARY KEY ("id")
) WITH (oids = false);


-- PROJECT TABLE
DROP TABLE IF EXISTS "project";
DROP SEQUENCE IF EXISTS project_id_seq;
CREATE SEQUENCE project_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."project" (
    "id" integer DEFAULT nextval('project_id_seq') NOT NULL,
    "userId" integer NOT NULL,
    "creationDate" date NOT NULL,
    "name" character varying(255) NOT NULL,
    CONSTRAINT "project_id" PRIMARY KEY ("id")
) WITH (oids = false);


-- CATEGORIZATION TABLE
DROP TABLE IF EXISTS "categorization";
DROP SEQUENCE IF EXISTS categorization_id_seq;
CREATE SEQUENCE categorization_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."categorization" (
    "id" integer DEFAULT nextval('categorization_id_seq') NOT NULL,
    "type" character varying(255) NOT NULL,
    CONSTRAINT "categorization_id" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "categorization" ("id", "type") VALUES
(1, 'Alphabetical'),
(2, 'Part of Speech')


-- COLLECTION TABLE
DROP TABLE IF EXISTS "collection";
DROP SEQUENCE IF EXISTS collection_id_seq;
CREATE SEQUENCE collection_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."collection" (
    "id" integer DEFAULT nextval('collection_id_seq') NOT NULL,
    "userId" integer NOT NULL,
    "categorizationId" integer NOT NULL,
    "creationDate" date NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" character varying(255) NOT NULL,
    "pinned" bool NOT NULL,
    CONSTRAINT "collection_id" PRIMARY KEY ("id")
) WITH (oids = false);


-- PROJECTCOLLECTION TABLE
DROP TABLE IF EXISTS "projectcollection";
DROP SEQUENCE IF EXISTS projectcollection_id_seq;
CREATE SEQUENCE projectcollection_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."projectcollection" (
    "id" integer DEFAULT nextval('projectcollection_id_seq') NOT NULL,
    "projectId" integer NOT NULL,
    "collectionId" integer NOT NULL,
    CONSTRAINT "projectcollection_id" PRIMARY KEY ("id")
) WITH (oids = false);


-- WORD TABLE
DROP TABLE IF EXISTS "word";
DROP SEQUENCE IF EXISTS word_id_seq;
CREATE SEQUENCE word_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."word" (
    "id" integer DEFAULT nextval('word_id_seq') NOT NULL,
    "userId" integer NOT NULL,
    "collectionId" integer NOT NULL,
    "mwWordId" character varying(510) NOT NULL,
    "name" character varying(255) NOT NULL,
    "lastViewed" date NOT NULL,
    CONSTRAINT "word_id" PRIMARY KEY ("id")
) WITH (oids = false);