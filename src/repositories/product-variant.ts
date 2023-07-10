import { ProductVariant } from '../models/product-variant';
import { dataSource } from '@medusajs/medusa/dist/loaders/database';
import { ProductVariantRepository as MedusaProductVariantRepository } from '@medusajs/medusa/dist/repositories/product-variant';

export const ProductVariantRepository = dataSource
  .getRepository(ProductVariant)
  .extend({
    ...Object.assign(MedusaProductVariantRepository, {
      target: ProductVariant,
    }),
  });

export default ProductVariantRepository;
