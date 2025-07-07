import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';    
import { GetManyPricesQuery } from './usecases/queries/getManyPrices.usecase';

import { Price } from './price.entity';

@Controller('price')
export class PriceController {
    constructor(private readonly queryBus: QueryBus) {}

    @Get('prices')
    async getManyPrices(): Promise<Array<Price>> {
        return await this.queryBus.execute(new GetManyPricesQuery());
    }

}
