import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import {
  ProductVariant as MedusaProductVariant,
  Image,
} from '@medusajs/medusa';

@Entity()
export class ProductVariant extends MedusaProductVariant {
  @ManyToMany(() => Image, { cascade: ['insert'] })
  @JoinTable({
    name: 'product_variant_images',
    joinColumn: {
      name: 'variant_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image_id',
      referencedColumnName: 'id',
    },
  })
  images: Image[];

  @Column({ type: 'text', nullable: true })
  thumbnail: string | null
}
