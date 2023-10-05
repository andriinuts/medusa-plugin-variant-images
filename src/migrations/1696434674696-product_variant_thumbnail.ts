import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductVariantThumbnail1696434674696 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "product_variant"' + ' ADD COLUMN "thumbnail" text'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "product_variant" DROP COLUMN "thumbnail"'
        );
    }
}
