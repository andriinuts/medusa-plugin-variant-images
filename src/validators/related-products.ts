import { AdminPostProductsProductVariantsVariantReq as MedusaAdminPostProductsProductVariantsVariantReq } from '@medusajs/medusa';
import { IsOptional, IsArray } from 'class-validator';

export class AdminPostProductsProductVariantsVariantReq extends MedusaAdminPostProductsProductVariantsVariantReq {
  @IsArray()
  @IsOptional()
  images?: string[];
}
