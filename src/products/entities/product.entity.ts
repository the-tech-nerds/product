import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Shop } from '../../shops/entities/shop.entity';
import { ProductVariance } from './product-variance.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({ default: true })
  status: boolean;

  @Column({
    type: 'int',
    nullable: false,
  })
  shop_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  brand_id: number;

  @Column({ nullable: true })
  @Index({ unique: true })
  slug: string;

  @Index()
  @JoinColumn({ name: 'brand_id' })
  @ManyToOne(
    () => Brand,
    (brand: Brand) => brand.products,
  )
  brand: Brand;

  @Index()
  @ManyToOne(
    () => Shop,
    (shop: Shop) => shop.products,
  )
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @ManyToMany(
    () => Category,
    (categories: Category) => categories.products,
    { cascade: true },
  )
  @JoinTable({ name: 'product_categories' })
  categories: Category[];

  @OneToMany(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.product,
  )
  productVariances: ProductVariance[];
}
