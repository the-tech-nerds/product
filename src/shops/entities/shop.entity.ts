import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';

@Entity({ name: 'shops' })
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  // @OneToMany(
  //   () => Product,
  //   (product: Product) => product.shop,
  // )
  // products!: Product[];

  @ManyToMany(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.shops,
    { eager: true },
  )
  @JoinTable({ name: 'shop_has_variances' })
  productVariances!: ProductVariance[];
}
