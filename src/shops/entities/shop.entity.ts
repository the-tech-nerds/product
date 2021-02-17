import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../utils/entities/base-entity';

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

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;
}
