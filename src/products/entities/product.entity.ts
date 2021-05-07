import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { ProductVariance } from './product-variance.entity';
import { FileStorage } from '../../common/file/entities/storage.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({ default: true })
  status: boolean;

  @Column({
    type: 'int',
  })
  supplier_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  brand_id: number;

  @Column({ nullable: true })
  @Index({ unique: true })
  slug: string;

  @Index()
  @JoinColumn({ name: 'supplier_id' })
  @ManyToOne(
    () => Supplier,
    (supplier: Supplier) => supplier.products,
  )
  supplier: Supplier;

  @Index()
  @JoinColumn({ name: 'brand_id' })
  @ManyToOne(
    () => Brand,
    (brand: Brand) => brand.products,
  )
  brand: Brand;

  @ManyToMany(
    () => Category,
    (categories: Category) => categories.products,
    { cascade: true },
  )
  @JoinTable({ name: 'product_categories' })
  categories: Category[];

  @OneToMany(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.product,
  )
  productVariances: ProductVariance[];

  images: FileStorage[];
}
