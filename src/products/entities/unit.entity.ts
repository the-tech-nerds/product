import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { ProductVariance } from './product-variance.entity';

@Entity({ name: 'units' })
class Unit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @OneToMany(
    () => ProductVariance,
    (productVariance: ProductVariance) => productVariance.unit,
  )
  productVariances: ProductVariance[];
}

export { Unit };
