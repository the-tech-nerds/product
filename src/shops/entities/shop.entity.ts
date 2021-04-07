import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from '../../products/entities/product.entity';

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

  @Column('integer', { default: ShopTypes[0].value })
  type_id: number;

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
  products!: Product[];

  @ManyToMany(
    () => Inventory,
    (inventories: Inventory) => inventories.shops,
  )
  inventories: Inventory[];
}
