import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ShopTypes } from '@the-tech-nerds/common-services';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from '../../products/entities/product.entity';

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
}
