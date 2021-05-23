import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FileStorage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  type_id: number;

  @ManyToOne(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.images,
    { nullable: true },
  )
  @JoinColumn({
    name: 'productVarianceId',
  })
  productVariance: ProductVariance;

  @ManyToOne(
    () => Shop,
    (shop: Shop) => shop.images,
    { nullable: true },
  )
  @JoinColumn({
    name: 'shop_id',
  })
  shop: Shop;
}
