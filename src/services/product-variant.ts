import { Lifetime } from 'awilix';
import {
  ProductVariantService as MedusaProductVariantService,
  ProductVariant,
} from '@medusajs/medusa';
import { Logger } from '@medusajs/types';
import { UpdateProductVariantInput as MedusaUpdateProductVariantInput } from '@medusajs/medusa/dist/types/product-variant';
import ImageRepository from '@medusajs/medusa/dist/repositories/image';

type UpdateProductVariantInput = {
  images: string[];
} & MedusaUpdateProductVariantInput;

class ProductVariantService extends MedusaProductVariantService {
  static LIFE_TIME = Lifetime.SCOPED;
  protected readonly imageRepository_: typeof ImageRepository;
  protected readonly logger_: Logger;

  constructor(container) {
    super(container);

    this.imageRepository_ = container.imageRepository;
    this.logger_ = container.logger;
  }

  // @ts-ignore
  async update(
    variantOrVariantId: string | Partial<ProductVariant>,
    update: UpdateProductVariantInput
  ): Promise<ProductVariant> {
    if (update.images) {
      const variant = await this.retrieve(variantOrVariantId as string);
      const variantRepo = this.activeManager_.withRepository(
        this.productVariantRepository_
      );
      const imageRepo = this.manager_.withRepository(this.imageRepository_);
      variant.images = await imageRepo.upsertImages(update.images);

      return await variantRepo.save(variant);
    }

    return super.update(variantOrVariantId, update);
  }
}

export default ProductVariantService;
