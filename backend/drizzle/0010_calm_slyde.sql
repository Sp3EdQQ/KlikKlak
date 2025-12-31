-- Step 1: Add slug column as nullable
ALTER TABLE "products" ADD COLUMN "slug" varchar(512);

-- Step 2: Generate slugs from existing product names
UPDATE "products" 
SET "slug" = lower(
  regexp_replace(
    regexp_replace(
      "name",
      '[^a-zA-Z0-9]+',
      '-',
      'g'
    ),
    '^-+|-+$',
    '',
    'g'
  )
) WHERE "slug" IS NULL;

-- Step 3: Handle duplicate slugs by appending row number
WITH ranked_products AS (
  SELECT 
    id,
    slug,
    ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at, id) as rn
  FROM products
)
UPDATE products p
SET slug = CASE 
  WHEN r.rn > 1 THEN p.slug || '-' || r.rn::text
  ELSE p.slug
END
FROM ranked_products r
WHERE p.id = r.id AND r.rn > 1;

-- Step 4: Make slug NOT NULL and add unique constraint
ALTER TABLE "products" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_slug_unique" UNIQUE("slug");