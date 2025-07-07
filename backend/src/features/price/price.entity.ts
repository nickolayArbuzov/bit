import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price_usd: number;

  @Column()
  timestamp: string;
}
