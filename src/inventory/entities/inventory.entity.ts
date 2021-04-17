import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';
import { Shop } from '../../shops/entities/shop.entity';

export enum InventoryStatusType {
  ACTIVE = 1,
  DRAFT = 0,
}

@Entity({ name: 'inventories' })
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  stock_count: number;

  @Column({
    type: 'enum',
    enum: InventoryStatusType,
    default: InventoryStatusType.DRAFT,
  })
  status: InventoryStatusType;

  @Column({ type: 'int', nullable: false })
  product_variance_id: number;

  @ManyToOne(
    () => ProductVariance,
    productVariance => productVariance.inventories,
  )
  @JoinColumn({ name: 'product_variance_id' })
  productVariance: ProductVariance;

  @ManyToMany(
    () => Shop,
    (shops: Shop) => shops.inventories,
  )
  @JoinTable({ name: 'inventory_shops' })
  shops: Shop[];
}
