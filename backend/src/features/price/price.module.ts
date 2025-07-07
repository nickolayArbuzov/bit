import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceController } from './price.controller';
import { Price } from './price.entity';
import { GetManyPricesUseCase } from './usecases/queries/getManyPrices.usecase';
import { PriceQueryRepository } from './repositories/price.query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), CqrsModule],
  controllers: [PriceController],
  providers: [
    GetManyPricesUseCase,
    PriceQueryRepository
  ],
})
export class PriceModule {}
