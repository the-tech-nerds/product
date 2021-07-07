import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';
import { FileStorage } from '../../common/file/entities/storage.entity';
import { Discount } from '../../discount/entities/discount.entity';

export enum OfferStatusType {
  ACTIVE = 1,
  INACTIVE = 2,
  DRAFT = 0,
}
@Entity({ name: 'offers' })
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  discount_id: number;

  @Column({ nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

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

  offer_detail: string;

  @Column({ nullable: false })
  start_date: Date;

  @Column({ nullable: false })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: OfferStatusType,
    default: OfferStatusType.DRAFT,
  })
  status: number;

  images: FileStorage[];

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string;
}
