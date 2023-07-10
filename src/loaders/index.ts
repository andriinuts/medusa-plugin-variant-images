import { registerExtendedValidator } from '../utils/register-extended-validator';
import { AdminPostProductsProductVariantsVariantReq } from '../validators/related-products';
import { registerOverride } from '@medusajs/medusa'

registerOverride({
  key: 'api/routes/admin/products/index',
  override: {
    defaultAdminProductRelations: ['variants.images'],
  },
});
registerOverride({
  key: 'api/routes/admin/variants/index',
  override: {
    defaultAdminVariantRelations: ['images'],
  },
});

export default async function () {
  registerExtendedValidator(AdminPostProductsProductVariantsVariantReq);
}
