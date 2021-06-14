import { Category } from 'src/categories/entities/category.entity';
import { Offer } from 'src/offer/entities/offer.entity';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

@Entity({ name: 'discounts' })
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'int', nullable: true })
  product_id: number;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(
    () => Product,
    (product: Product) => product.discounts,
  )
  product: Product;

  @Column({ type: 'int', nullable: true })
  category_id: number;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(
    () => Category,
    (category: Category) => category.discounts,
  )
  category: Category;

  @Column({ type: 'int', nullable: false })
  product_variance_id: number;

  @JoinColumn({ name: 'product_variance_id' })
  @ManyToOne(
    () => ProductVariance,
    (product_variance: ProductVariance) => product_variance.discounts,
  )
  product_variance: ProductVariance;

  @Column({ type: 'int', nullable: true })
  discount_percentage: number;

  @Column({ type: 'int', nullable: true })
  discount_amount: number;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ type: 'int', nullable: false })
  status: number;

  @OneToMany(
    () => Offer,
    (offer: Offer) => offer.discount,
  )
  offers: Offer[];
}
