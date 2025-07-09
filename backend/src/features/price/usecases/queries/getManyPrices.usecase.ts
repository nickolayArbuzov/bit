import { QueryHandler } from '@nestjs/cqrs';
import { PriceQueryRepository } from '../../repositories';
import { Readable } from 'stream';

export class GetManyPricesQuery {
  constructor(
    public readonly range: { from: Date; to: Date },
  ) {}
}

@QueryHandler(GetManyPricesQuery)
export class GetManyPricesUseCase {
  constructor(
    private readonly priceQueryRepository: PriceQueryRepository,
  ) {}

  async execute(query: GetManyPricesQuery): Promise<Readable> {
    const { from, to } = query.range;
    return this.priceQueryRepository.getPricesStream(from, to);
  }
}