import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from './product.entity';
import { Unit } from './unit.entity';

@Entity({ name: 'products' })
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

  @Column({ default: true })
  status: boolean;

  @Index()
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(
    () => Product,
    (product) => product.id,
  )
  product_id: number;

  @JoinColumn({ name: 'unit_id' })
  @ManyToOne(
    () => Unit,
    (unit) => unit.id,
  )
  unit_id: number;

  @Column({ nullable: true })
  unit_value: string;
}
