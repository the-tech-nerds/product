import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @ManyToMany(
    type => Category,
    categories => categories.products,
  )
  @JoinTable()
  categories: Category[];

  @Column()
  is_active: boolean;
}
