import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index('idx_price_timestamp', ['timestamp'])
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double precision')
  price_usd: number;

  @Column('timestamptz', { unique: true })
  timestamp: Date;
}
