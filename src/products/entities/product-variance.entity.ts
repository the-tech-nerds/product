import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from 'src/discount/entities/discount.entity';
import BaseEntity from '../../utils/entities/base-entity';
import { Product } from './product.entity';
import { Unit } from './unit.entity';
import { Shop } from '../../shops/entities/shop.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { FileStorage } from '../../common/file/entities/storage.entity';

@Entity({ name: 'product_variances' })
export class ProductVariance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Index({ unique: true })
  @Column()
  sku: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  color: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  product_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  unit_id: number;

  @Column({ type: 'int', nullable: true })
  discount_id: number | null;

  @Column({ default: true })
  status: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Index()
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(
    () => Product,
    (product: Product) => product.productVariances,
  )
  product: Product;

  @ManyToMany(
    () => Shop,
    (shop: Shop) => shop.productVariances,
  )
  @JoinTable({ name: 'shop_has_variances' })
  shops: Shop[];

  @JoinColumn({ name: 'unit_id' })
  @ManyToOne(
    () => Unit,
    (unit: Unit) => unit.productVariances,
  )
  unit: Unit;

  @Column({ nullable: true })
  unit_value: string;

  @OneToMany(
    () => Inventory,
    inventory => inventory.productVariance,
  )
  inventories!: Inventory[];

  @Column({ type: 'int', nullable: false })
  product_variance_id: number;

  @JoinColumn({ name: 'discount_id' })
  @ManyToOne(
    () => Discount,
    (discount: Discount) => discount.productVariances,
  )
  discount: Discount;

  @OneToMany(
    () => FileStorage,
    fileStorage => fileStorage.product_variance,
  )
  images: FileStorage[];

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string;
}
