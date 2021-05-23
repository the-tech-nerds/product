import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ShopTypes } from '@the-tech-nerds/common-services';
import { FileStorage } from 'src/common/file/entities/storage.entity';
import BaseEntity from '../../utils/entities/base-entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

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
  @Column({ default: true })
  is_active: boolean;

  @Column()
  address: string;

  // @OneToMany(
  //   () => Product,
  //   (product: Product) => product.shop,
  // )
  // products!: Product[];

  @ManyToMany(
    () => Inventory,
    (inventories: Inventory) => inventories.shops,
  )
  inventories: Inventory[];

  @ManyToMany(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.shops,
  )
  productVariances: ProductVariance[];

  @OneToMany(
    () => FileStorage,
    (fileStorage: FileStorage) => fileStorage.shop,
  )
  images: FileStorage[];
}
