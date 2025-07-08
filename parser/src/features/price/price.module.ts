import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceCron } from './price.cron';
import { Price } from './price.entity';
import { CreatePriceUseCase } from './usecases';
import { PriceCommandRepository } from './repositories';
import { CoingeckoPriceParser } from '../../infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), CqrsModule],
  controllers: [],
  providers: [
    PriceCron,
    CreatePriceUseCase,
    CoingeckoPriceParser,
    PriceCommandRepository
  ],
})
export class PriceModule {}
