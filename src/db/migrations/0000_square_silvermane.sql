CREATE TYPE "public"."growth_habit" AS ENUM('wzniosły', 'kępiasty', 'płożący');--> statement-breakpoint
CREATE TYPE "public"."soil_ph" AS ENUM('kwaśne', 'obojętne', 'zasadowe');--> statement-breakpoint
CREATE TYPE "public"."soil_type" AS ENUM('piaszczysta', 'gliniasta', 'próchnicza');--> statement-breakpoint
CREATE TYPE "public"."light_requirement" AS ENUM('pełne słońce', 'półcień', 'cień');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" text,
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "plants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"latin_name" text NOT NULL,
	"common_names" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"growth_habit" "growth_habit" NOT NULL,
	"growth_rate" smallint DEFAULT 2,
	"water_requirement" smallint DEFAULT 2,
	"standing" "light_requirement" NOT NULL,
	"soil_type" "soil_type" NOT NULL,
	"soil_ph" "soil_ph" NOT NULL,
	"flower_color" text NOT NULL,
	"leaf_color" text NOT NULL,
	"flowering_months" json DEFAULT '{"from":4,"to":10}'::json,
	"height" json DEFAULT '{"from":25,"to":40}'::json
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;