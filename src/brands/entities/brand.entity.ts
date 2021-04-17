import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'brands' })
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'int', nullable: true })
  supplier_id: number;

  @ManyToOne(
    type => Supplier,
    supplier => supplier.brand,
    {
      cascade: ['update', 'insert'],
    },
  )
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @OneToMany(
    () => Product,
    product => product.brand,
  )
  products!: Product[];
}
