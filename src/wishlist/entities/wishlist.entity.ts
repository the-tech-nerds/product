import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

@Entity({ name: 'wishlist' })
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_variance_Id: number;

  @ManyToOne(
    () => ProductVariance,
    (variance: ProductVariance) => variance,
  )
  product_variance: ProductVariance;

  @Column()
  product_id: number;

  @ManyToOne(
    () => Product,
    (product: Product) => product.productVariances,
  )
  product: Product;
}
