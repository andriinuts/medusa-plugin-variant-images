import { MigrationInterface, QueryRunner } from 'typeorm';

export class productVariantImages1688410506235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_variant_images" ("variant_id" character varying NOT NULL, "image_id" character varying NOT NULL, CONSTRAINT "PK_variant_image" PRIMARY KEY ("variant_id", "image_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_product_variant_images_variant_id" ON "product_variant_images" ("variant_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_product_variant_images_image_id" ON "product_variant_images" ("image_id") `
    );

    await queryRunner.query(
      `ALTER TABLE "product_variant_images" ADD CONSTRAINT "FK_product_variant_images_variant_id" FOREIGN KEY ("variant_id") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_images" ADD CONSTRAINT "FK_product_variant_images_image_id" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_variant_images" DROP CONSTRAINT "FK_product_variant_images_variant_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_images" DROP CONSTRAINT "FK_product_variant_images_image_id"`
    );
    await queryRunner.query(`DROP TABLE "product_variant_images"`);
  }
}
