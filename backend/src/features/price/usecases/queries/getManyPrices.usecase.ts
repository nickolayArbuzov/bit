import { QueryHandler } from '@nestjs/cqrs';
import { PriceQueryRepository } from '../../repositories';

export class GetManyPricesQuery {
  constructor() {}
}

@QueryHandler(GetManyPricesQuery)
export class GetManyPricesUseCase {
  constructor(
    private priceQueryRepository: PriceQueryRepository,
  ) {}

    async execute(query: GetManyPricesQuery){
      const price = await this.priceQueryRepository.getManyPrices()
      return price
    }
}