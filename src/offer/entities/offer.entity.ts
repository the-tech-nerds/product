import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

export enum OfferStatusType {
  ACTIVE = 1,
  DRAFT = 0,
}
@Entity({ name: 'offers' })
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ nullable: false, type: 'text' })
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
}
