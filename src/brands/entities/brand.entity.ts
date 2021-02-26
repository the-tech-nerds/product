import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import BaseEntity from '../../utils/entities/base-entity';

@Entity({ name: 'brands' })
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'int', nullable: false })
  supplier_id: number;

  @ManyToOne(
    type => Supplier,
    supplier => supplier.brand,
  )
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
