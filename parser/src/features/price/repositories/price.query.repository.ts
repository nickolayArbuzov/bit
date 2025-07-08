import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '../price.entity';

@Injectable()
export class PriceQueryRepository {
  constructor(
    @InjectRepository(Price)
    private readonly repository: Repository<Price>,
  ) {}

  async count(): Promise<number> {
    return this.repository.count();
  }

  async getLastTimestamp(): Promise<Date | null> {
    const last = await this.repository.findOne({
      order: { timestamp: 'DESC' },
      select: { timestamp: true },
    });
    return last?.timestamp ?? null;
  }
}