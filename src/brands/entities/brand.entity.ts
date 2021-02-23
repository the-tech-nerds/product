import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import BaseEntity from '../../utils/entities/base-entity';

@Entity({ name: 'brands' })
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
