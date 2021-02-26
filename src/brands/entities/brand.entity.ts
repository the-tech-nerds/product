import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
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

  @OneToMany(
    type => Supplier,
    supplier => supplier.id,
  )
  @JoinColumn({ name: 'supplier_id' })
  suppliers: Supplier[];
}
