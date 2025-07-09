import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  price_usd: number;

  @Column('timestamptz', { unique: true })
  timestamp: Date;
}
