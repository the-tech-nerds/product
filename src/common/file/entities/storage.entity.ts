import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../../products/entities/product.entity';
import { Category } from '../../../categories/entities/category.entity';
import { Brand } from '../../../brands/entities/brand.entity';
import { Offer } from '../../../offer/entities/offer.entity';

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

  @Column({ nullable: true })
  product_id: number;

  @Column({ nullable: true })
  product_variance_id: number;

  @Column({ nullable: true })
  shop_id: number;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  brand_id: number;

  @Column({ nullable: true })
  offer_id: number;

  @ManyToOne(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.images,
    { nullable: true },
  )
  @JoinColumn({
    name: 'product_variance_id',
  })
  product_variance: ProductVariance;

  @ManyToOne(
    () => Shop,
    (shop: Shop) => shop.images,
    { nullable: true },
  )
  @JoinColumn({
    name: 'shop_id',
  })
  shop: Shop;

  @ManyToOne(
    () => Product,
    (product: Product) => product.images,
    { nullable: true },
  )
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(
    () => Category,
    (category: Category) => category.files,
    { nullable: true },
  )
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @ManyToOne(
    () => Brand,
    (brand: Brand) => brand.images,
    { nullable: true },
  )
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand;

  @ManyToOne(
    () => Offer,
    (offer: Offer) => offer.images,
    { nullable: true },
  )
  @JoinColumn({
    name: 'offer_id',
  })
  offer: Offer;
}
