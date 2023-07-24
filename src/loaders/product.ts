export default async function () {
  const adminProductImports = (await import(
    '@medusajs/medusa/dist/api/routes/admin/products/index'
  )) as any;

  const storeProductImports = (await import(
    '@medusajs/medusa/dist/api/routes/store/products/index'
  )) as any;

  adminProductImports.defaultAdminProductRelations = [
    ...adminProductImports.defaultAdminProductRelations,
    'variants.images',
  ];

  storeProductImports.defaultStoreProductsRelations = [
    ...storeProductImports.defaultStoreProductsRelations,
    'variants.images',
  ]
}
