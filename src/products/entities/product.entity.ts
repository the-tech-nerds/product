import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @JoinColumn({ name: 'brand_id' })
  @ManyToOne(
    () => Brand,
    brand => brand.id,
  )
  brand_id: number;

  @JoinColumn({ name: 'shop_id' })
  @ManyToOne(
    () => Brand,
    shop => shop.id,
  )
  shop_id: number;

  @ManyToMany(
    () => Category,
    categories => categories.products,
  )
  @JoinTable()
  categories: Category[];
}
