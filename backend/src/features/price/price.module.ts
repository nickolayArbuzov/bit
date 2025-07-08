import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceController } from './price.controller';
import { Price } from './price.entity';
import { GetManyPricesUseCase } from './usecases';
import { PriceQueryRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), CqrsModule],
  controllers: [PriceController],
  providers: [
    GetManyPricesUseCase,
    PriceQueryRepository
  ],
})
export class PriceModule {}
