import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Index,
  OneToMany,
} from 'typeorm';
import { ShopTypes } from '@the-tech-nerds/common-services';
import { FileStorage } from '../../common/file/entities/storage.entity';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  slug: string;

  @Column('integer', { default: ShopTypes[0].value })
  type_id: number;

  @Column('integer', { default: 0 })
  parent_id: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(
    () => Product,
    (products: Product) => products.categories,
  )
  products!: Product[];

  @OneToMany(
    () => FileStorage,
    (fileStorage: FileStorage) => fileStorage.category,
  )
  files: FileStorage[];

  @Column()
  image: string;
}
