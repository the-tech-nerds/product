import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from '../../products/entities/product.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

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

  @OneToMany(
    () => Product,
    product => product.shop,
  )
  products!: Product[];

  @ManyToMany(
    () => Inventory,
    (inventories: Inventory) => inventories.shops,
  )
  inventories: Inventory[];
}
