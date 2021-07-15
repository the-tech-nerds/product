import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';
import { Offer } from '../../offer/entities/offer.entity';

@Entity({ name: 'discounts' })
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => Category,
    (category: Category) => category.discount,
  )
  categories: Category[];

  @OneToMany(
    () => Product,
    (product: Product) => product.discount,
  )
  products: Product[];

  @OneToMany(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.discount,
  )
  productVariances: ProductVariance[];

  @OneToMany(
    () => Offer,
    (offer: Offer) => offer.discount,
  )
  offers: Offer[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  discount_percentage: number;

  @Column({ nullable: true })
  discount_amount: number;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'int', default: 0 })
  is_assigned: number;
}
