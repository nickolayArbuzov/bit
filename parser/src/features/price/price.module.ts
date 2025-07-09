import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceCron } from './price.cron';
import { Price } from './price.entity';
import { CreatePriceUseCase } from './usecases';
import { PriceCommandRepository, PriceQueryRepository } from './repositories';
import { PriceSeeder } from './seeder';
import { ParserModule } from '../../parser';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), CqrsModule, ParserModule],
  controllers: [],
  providers: [
    PriceCron,
    CreatePriceUseCase,
    PriceCommandRepository,
    PriceQueryRepository,
    PriceSeeder,
  ],
})
export class PriceModule {}
