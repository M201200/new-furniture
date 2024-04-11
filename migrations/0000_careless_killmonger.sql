CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" text NOT NULL,
	"item_vendor_code" text NOT NULL,
	"amount" smallint NOT NULL,
	CONSTRAINT "cart_item_vendor_code_unique" UNIQUE("item_vendor_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" bigint NOT NULL,
	"en" text NOT NULL,
	"ro" text NOT NULL,
	"ru" text NOT NULL,
	"layer" smallint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text,
	CONSTRAINT "categories_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characteristics_furniture" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_code" text NOT NULL,
	"color_1" text NOT NULL,
	"material_2" text NOT NULL,
	"width_3(sm)" real NOT NULL,
	"height_4(sm)" real NOT NULL,
	"depth_5(sm)" real NOT NULL,
	"weight(kg)" real NOT NULL,
	"folding" boolean NOT NULL,
	"warranty(month)" smallint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text,
	CONSTRAINT "characteristics_furniture_vendor_code_unique" UNIQUE("vendor_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "colors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"en" text NOT NULL,
	"ro" text NOT NULL,
	"ru" text NOT NULL,
	"hex" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text,
	CONSTRAINT "colors_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exchange_rates_USD" (
	"id" serial PRIMARY KEY NOT NULL,
	"EUR" real NOT NULL,
	"MDL" real NOT NULL,
	"date" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" text NOT NULL,
	"item_vendor_code" text NOT NULL,
	CONSTRAINT "favorites_item_vendor_code_unique" UNIQUE("item_vendor_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_code" bigint NOT NULL,
	"serial_number" bigint NOT NULL,
	"variation" text NOT NULL,
	"vendor_code" text GENERATED ALWAYS AS ((cast(category_code as text) || '-' || cast(serial_number as text) || '-' || variation)) STORED,
	"amount" integer NOT NULL,
	"price($)" double precision NOT NULL,
	"discount(%)" double precision DEFAULT 0 NOT NULL,
	"final_price($)" double precision GENERATED ALWAYS AS (("price($)"*((100 - "discount(%)") / 100))) STORED,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items_description" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_code" text NOT NULL,
	"en" text NOT NULL,
	"ro" text NOT NULL,
	"ru" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text,
	CONSTRAINT "items_description_vendor_code_unique" UNIQUE("vendor_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_image_URLs" (
	"id" serial PRIMARY KEY NOT NULL,
	"root_catalog" text DEFAULT 'images' NOT NULL,
	"category_code" bigint NOT NULL,
	"item_serial_number" bigint NOT NULL,
	"item_variation" text DEFAULT 'c0m0w0h0d0' NOT NULL,
	"vendor_code" text GENERATED ALWAYS AS ((cast(category_code as text) || '-' || cast(item_serial_number as text) || '-' || item_variation)) STORED,
	"image_number" smallint NOT NULL,
	"image_type" text DEFAULT 'webp' NOT NULL,
	"url" text GENERATED ALWAYS AS (('/' || root_catalog || '/' || cast(category_code as text) || '/' || cast(item_serial_number as text) || '/' || item_variation || '/' || cast(image_number as text) || '.' || image_type)) STORED,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items_name" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_code" text NOT NULL,
	"en" text NOT NULL,
	"ro" text NOT NULL,
	"ru" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text,
	CONSTRAINT "items_name_vendor_code_unique" UNIQUE("vendor_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "materials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"en" text NOT NULL,
	"ro" text NOT NULL,
	"ru" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" text,
	CONSTRAINT "materials_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" text NOT NULL,
	"item_vendor_code" text NOT NULL,
	"amount" smallint NOT NULL,
	"purchase_time" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" text NOT NULL,
	"language" text,
	"theme" text,
	"currency" text,
	CONSTRAINT "user_profile_user_email_unique" UNIQUE("user_email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "width_idx" ON "characteristics_furniture" ("width_3(sm)");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "height_idx" ON "characteristics_furniture" ("height_4(sm)");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "depth_idx" ON "characteristics_furniture" ("depth_5(sm)");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "vendor_code_compound_idx" ON "items" ("category_code","serial_number","variation");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "vendor_code_idx" ON "items" ("vendor_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "final_price_idx" ON "items" ("final_price($)");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "compound_idx" ON "item_image_URLs" ("category_code","item_serial_number","item_variation","image_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email" ON "orders" ("user_email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
