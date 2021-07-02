import { Discount } from 'src/discount/entities/discount.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

@Entity({ name: 'offers' })
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  discount_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ nullable: false, type: 'text' })
  offer_info: string;

  @JoinColumn({ name: 'discount_id' })
  @ManyToOne(
    () => Discount,
    (discount: Discount) => discount.offers,
  )
  discount: Discount;

  @Column({ nullable: false })
  start_date: Date;

  @Column({ nullable: false })
  end_date: Date;

  @Column({ type: 'int', nullable: false })
  status: number;
}
