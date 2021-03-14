import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileStorage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  type_id: number;
}
