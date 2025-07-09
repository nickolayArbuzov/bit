import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '../price.entity';
import { Readable } from 'stream';

@Injectable()
export class PriceQueryRepository {
  constructor(
    @InjectRepository(Price)
    private readonly repository: Repository<Price>,
  ) {}

  async getPricesStream(from: Date, to: Date): Promise<Readable> {
    return this.repository
      .createQueryBuilder('price')
      .where('price.timestamp BETWEEN :from AND :to', { from, to })
      .orderBy('price.timestamp', 'ASC')
      .stream();
  }
}