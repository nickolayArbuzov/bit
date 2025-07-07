import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceController } from './price.controller';
import { Price } from './price.entity';
import { CreatePriceUseCase } from './usecases/commands/createPrice.usecase';
import { PriceCommandRepository } from './repositories/price.command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), CqrsModule],
  controllers: [PriceController],
  providers: [
    CreatePriceUseCase,
    PriceCommandRepository
  ],
})
export class PriceModule {}
