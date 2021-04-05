import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from './product.entity';
import { Unit } from './unit.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Entity({ name: 'product_variances' })
export class ProductVariance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Index({ unique: true })
  @Column()
  sku: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  color: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  product_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  unit_id: number;

  @Column({ default: true })
  status: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Index()
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(
    () => Product,
    (product: Product) => product.productVariances,
  )
  product: Product;

  @JoinColumn({ name: 'unit_id' })
  @ManyToOne(
    () => Unit,
    (unit: Unit) => unit.productVariances,
  )
  unit: Unit;

  @Column({ nullable: true })
  unit_value: string;

  @OneToMany(
    () => Inventory,
    inventory => inventory.productVariance,
  )
  inventories!: Inventory[];
}
