/*
Navicat PGSQL Data Transfer

Source Server         : PSQL
Source Server Version : 90605
Source Host           : localhost:5432
Source Database       : backOffice
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90605
File Encoding         : 65001

Date: 2017-10-22 20:57:02
*/


-- ----------------------------
-- Sequence structure for tbl_roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_roles_id_seq";
CREATE SEQUENCE "public"."tbl_roles_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 3
 CACHE 1;
SELECT setval('"public"."tbl_roles_id_seq"', 3, true);

-- ----------------------------
-- Sequence structure for tbl_users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_users_id_seq";
CREATE SEQUENCE "public"."tbl_users_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 7
 CACHE 1;
SELECT setval('"public"."tbl_users_id_seq"', 7, true);

-- ----------------------------
-- Table structure for alembic_version
-- ----------------------------
DROP TABLE IF EXISTS "public"."alembic_version";
CREATE TABLE "public"."alembic_version" (
"version_num" varchar(32) COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of alembic_version
-- ----------------------------
INSERT INTO "public"."alembic_version" VALUES ('5fae346fe6c2');

-- ----------------------------
-- Table structure for tbl_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_roles";
CREATE TABLE "public"."tbl_roles" (
"id" int4 DEFAULT nextval('tbl_roles_id_seq'::regclass) NOT NULL,
"name" varchar(30) COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of tbl_roles
-- ----------------------------
INSERT INTO "public"."tbl_roles" VALUES ('1', 'admin');
INSERT INTO "public"."tbl_roles" VALUES ('2', 'manager');
INSERT INTO "public"."tbl_roles" VALUES ('3', 'user');

-- ----------------------------
-- Table structure for tbl_user_details
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_user_details";
CREATE TABLE "public"."tbl_user_details" (
"user_id" int4 NOT NULL,
"address" varchar(100) COLLATE "default",
"phone" varchar(50) COLLATE "default",
"postal_code" varchar(30) COLLATE "default",
"date_of_birth" date,
"gender" varchar(10) COLLATE "default",
"avatar" varchar(100) COLLATE "default",
"data_created" timestamp(6) NOT NULL,
"data_updated" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of tbl_user_details
-- ----------------------------
INSERT INTO "public"."tbl_user_details" VALUES ('1', '7th Street 45, San Francisco, California', '+1394734913', 'DFKJD343', '1974-02-15', 'male', null, '2017-10-21 12:48:31', '1900-01-01 00:00:00');
INSERT INTO "public"."tbl_user_details" VALUES ('2', '21th Street 125, Boston, Masachusets', '+13438039481', 'KJLEID35', '1987-11-24', 'male', null, '2017-10-21 12:49:19', '1900-01-01 00:00:00');
INSERT INTO "public"."tbl_user_details" VALUES ('4', '45th Street 74, Chicago, Ilinois', '+10984371343', 'IIUDF234DFLJ', '1991-09-03', 'female', null, '2017-10-21 12:50:10', '1900-01-01 00:00:00');

-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_users";
CREATE TABLE "public"."tbl_users" (
"id" int4 DEFAULT nextval('tbl_users_id_seq'::regclass) NOT NULL,
"first_name" varchar(30) COLLATE "default" NOT NULL,
"last_name" varchar(30) COLLATE "default" NOT NULL,
"email" varchar(50) COLLATE "default" NOT NULL,
"password" varchar(150) COLLATE "default" NOT NULL,
"role_id" int4 NOT NULL,
"active" bool NOT NULL,
"created_at" timestamp(6) NOT NULL,
"updated_at" timestamp(6)
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of tbl_users
-- ----------------------------
INSERT INTO "public"."tbl_users" VALUES ('1', 'John', 'Jackson', 'johnjackson@gmail.com', 'sha256$unix$5b8d314ab35ebbe2254c5ec572537088a0c8de08b37d59922ee7aef1c81749a1', '1', 't', '2017-10-21 12:48:31', '1900-01-01 00:00:00');
INSERT INTO "public"."tbl_users" VALUES ('2', 'Jimmy', 'Rose', 'jimmyrose@gmail.com', 'sha256$7zaA$bcfa7adcaf704c661a946b018817ba75118acbabd0a8274abf4051888cba9e76', '2', 't', '2017-10-21 12:49:19', '1900-01-01 00:00:00');
INSERT INTO "public"."tbl_users" VALUES ('4', 'Ann', 'Hataway', 'annhataway@yahoo.com', 'sha256$zl5r$dd3eb63d249129cfe9bb0a6d340482cebb73762ad5731df87f496563c6425617', '3', 't', '2017-10-21 12:50:10', '1900-01-01 00:00:00');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
ALTER SEQUENCE "public"."tbl_roles_id_seq" OWNED BY "tbl_roles"."id";
ALTER SEQUENCE "public"."tbl_users_id_seq" OWNED BY "tbl_users"."id";

-- ----------------------------
-- Primary Key structure for table alembic_version
-- ----------------------------
ALTER TABLE "public"."alembic_version" ADD PRIMARY KEY ("version_num");

-- ----------------------------
-- Primary Key structure for table tbl_roles
-- ----------------------------
ALTER TABLE "public"."tbl_roles" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_user_details
-- ----------------------------
ALTER TABLE "public"."tbl_user_details" ADD PRIMARY KEY ("user_id");

-- ----------------------------
-- Primary Key structure for table tbl_users
-- ----------------------------
ALTER TABLE "public"."tbl_users" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Key structure for table "public"."tbl_user_details"
-- ----------------------------
ALTER TABLE "public"."tbl_user_details" ADD FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Key structure for table "public"."tbl_users"
-- ----------------------------
ALTER TABLE "public"."tbl_users" ADD FOREIGN KEY ("role_id") REFERENCES "public"."tbl_roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
