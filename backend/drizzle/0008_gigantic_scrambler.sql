-- Tabela products już istnieje, więc modyfikujemy ją
-- Najpierw usuwamy stare kolumny (description)
ALTER TABLE "products" DROP COLUMN IF EXISTS "description";

-- Dodajemy nowe kolumny
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "component_type" varchar(50) NOT NULL DEFAULT 'unknown';
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "component_id" uuid;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "producer" varchar(100);
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "mpn" varchar(100);
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "ean" varchar(13);
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "product_page" varchar(512);

-- Zmieniamy typ category_id z varchar na uuid (jeśli potrzeba)
ALTER TABLE "products" ALTER COLUMN "category_id" TYPE uuid USING "category_id"::uuid;

-- Modyfikujemy kolumnę price aby miała precision
ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric(10, 2);

-- Dodajemy timestamps jeśli ich nie ma
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;

-- Usuwamy default z component_type (był tylko na potrzeby migracji)
ALTER TABLE "products" ALTER COLUMN "component_type" DROP DEFAULT;

-- Dodajemy foreign key do categories
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;