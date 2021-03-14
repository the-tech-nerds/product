import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import BaseEntity from '../../utils/entities/base-entity';

@Entity({ name: 'suppliers' })
export class Supplier extends BaseEntity {
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
    nullable: false,
  })
  address: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  email: string;

  @OneToMany(
    type => Brand,
    brand => brand.supplier,
  )
  brand: Brand[];
}
