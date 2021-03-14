import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
