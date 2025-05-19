import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" RENAME COLUMN "image_blur_url_id" TO "image_base64";
  ALTER TABLE "categories" RENAME COLUMN "image_blur_url_id" TO "image_base64";
  ALTER TABLE "authors" RENAME COLUMN "image_blur_url_id" TO "image_base64";
  ALTER TABLE "posts" DROP CONSTRAINT "posts_image_blur_url_id_media_id_fk";
  
  ALTER TABLE "categories" DROP CONSTRAINT "categories_image_blur_url_id_media_id_fk";
  
  ALTER TABLE "authors" DROP CONSTRAINT "authors_image_blur_url_id_media_id_fk";
  
  DROP INDEX "posts_image_blur_url_idx";
  DROP INDEX "categories_image_blur_url_idx";
  DROP INDEX "authors_image_blur_url_idx";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" RENAME COLUMN "image_base64" TO "image_blur_url_id";
  ALTER TABLE "categories" RENAME COLUMN "image_base64" TO "image_blur_url_id";
  ALTER TABLE "authors" RENAME COLUMN "image_base64" TO "image_blur_url_id";
  ALTER TABLE "posts" ADD CONSTRAINT "posts_image_blur_url_id_media_id_fk" FOREIGN KEY ("image_blur_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_blur_url_id_media_id_fk" FOREIGN KEY ("image_blur_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_image_blur_url_id_media_id_fk" FOREIGN KEY ("image_blur_url_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_image_blur_url_idx" ON "posts" USING btree ("image_blur_url_id");
  CREATE INDEX "categories_image_blur_url_idx" ON "categories" USING btree ("image_blur_url_id");
  CREATE INDEX "authors_image_blur_url_idx" ON "authors" USING btree ("image_blur_url_id");`)
}
