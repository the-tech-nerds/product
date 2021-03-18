import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column('integer', { default: 0 })
  parent_id: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(
    () => Product,
    (products: Product) => products.categories,
  )
  products!: Product[];
}
