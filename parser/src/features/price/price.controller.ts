import { Controller, HttpException, HttpStatus, Body, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';    
import { CreatePriceCommand } from './usecases/commands/createPrice.usecase';
import { CreatePriceDto } from './price.dto';
import { Price } from './price.entity';

@Controller('price')
export class PriceController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    async createPrice(@Body() data: CreatePriceDto): Promise<Price> {
        const price = await this.commandBus.execute(new CreatePriceCommand(data));
        if (price) {
          return price
        } else {
            throw new HttpException('Price not found', HttpStatus.NOT_FOUND)
        }
    }

}
