import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from '../../products/entities/product.entity';

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
    nullable: true,
  })
  email: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(
    type => Brand,
    brand => brand.supplier,
  )
  brands: Brand[];

  @OneToMany(
    type => Product,
    product => product.supplier,
  )
  products: Product[];
}
