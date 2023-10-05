import { registerOverriddenValidators } from '@medusajs/medusa';
import {IsArray, IsOptional, IsString} from 'class-validator';
import { AdminPostProductsProductVariantsVariantReq as MedusaAdminPostProductsProductVariantsVariantReq } from '@medusajs/medusa/dist/api/routes/admin/products/update-variant';

class AdminPostProductsProductVariantsVariantReq extends MedusaAdminPostProductsProductVariantsVariantReq {
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsString()
    @IsOptional()
    thumbnail?: string;
}

registerOverriddenValidators(AdminPostProductsProductVariantsVariantReq);