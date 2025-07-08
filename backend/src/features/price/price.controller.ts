import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';    
import { Price } from './price.entity';
import { GetManyPricesQuery } from './usecases';

@Controller('price')
export class PriceController {
    constructor(private readonly queryBus: QueryBus) {}

    @Get('prices')
    async getManyPrices(): Promise<Array<Price>> {
        return await this.queryBus.execute(new GetManyPricesQuery());
    }

}
