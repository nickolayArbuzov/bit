import { CommandHandler } from '@nestjs/cqrs';
import { PriceCommandRepository } from '../../repositories/price.command.repository';
import { CreatePriceDto } from '../../price.dto';

export class CreatePriceCommand {
  constructor(public data: CreatePriceDto) {}
}

@CommandHandler(CreatePriceCommand)
export class CreatePriceUseCase {
  constructor(
    private priceCommandRepository: PriceCommandRepository,
  ) {}

    async execute(command: CreatePriceCommand){
      const price = await this.priceCommandRepository.createPrice(command.data)
      return price
    }
}