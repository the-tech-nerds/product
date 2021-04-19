import { FileStorage } from 'src/common/file/entities/storage.entity';
import { InventoryVariance } from 'src/products/view/inventory-variance.view';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Product } from 'src/products/entities/product.entity';
import { VwProductVariance } from 'src/products/view/vw_product_variance.view';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

@Entity({ name: 'wishlist' })
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_variance_Id: number;

  @ManyToOne(
    () => ProductVariance,
    (variance: ProductVariance) => variance,
  )
  @JoinColumn({ name: 'product_variance_Id' })
  product_variance: ProductVariance;

  @Column()
  product_id: number;

  @ManyToOne(
    () => Product,
    (product: Product) => product.productVariances,
  )
  @JoinColumn({ name: 'product_id' })
  product: Product;

  inventoryVariance: InventoryVariance[];

  vwProductVariance: VwProductVariance;

  images: FileStorage[];
}
