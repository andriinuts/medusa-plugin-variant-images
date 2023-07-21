export default async function () {
  const adminVariantsImports = (await import(
    '@medusajs/medusa/dist/api/routes/admin/variants/index'
  )) as any;

  const storeVariantsImports = (await import(
      '@medusajs/medusa/dist/api/routes/store/variants/index'
  )) as any;

  adminVariantsImports.defaultAdminVariantRelations = [
    ...adminVariantsImports.defaultAdminVariantRelations,
    'images',
  ];

  storeVariantsImports.defaultStoreVariantRelations = [
    ...storeVariantsImports.defaultStoreVariantRelations,
    'images',
  ];
}
