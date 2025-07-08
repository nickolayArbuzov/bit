import { Injectable } from '@nestjs/common';
import { CoingeckoPriceParser } from './coingecko.parser';
import { PriceCommandRepository, PriceQueryRepository } from '../features/price/repositories';

@Injectable()
export class PriceSeeder {
  constructor(
    private readonly parser: CoingeckoPriceParser,
    private readonly commandRepository: PriceCommandRepository,
    private readonly queryRepository: PriceQueryRepository,
  ) {}

  async seedIfNeeded() {
    const count = await this.queryRepository.count();
    if (count > 0) {
      return;
    }

    const to = new Date();
    const from = new Date(to.getTime() - 365 * 24 * 60 * 60 * 1000); 

    const prices = await this.parser.fetchHistory(from, to);

    await this.commandRepository.seedPrice(prices);
  }
}