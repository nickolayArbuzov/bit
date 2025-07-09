import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceCommandRepository } from '../../repositories';
import { CoingeckoPriceParser } from '../../../../parser/coingecko.parser';

export class CreatePriceCommand {
  constructor() {}
}

@CommandHandler(CreatePriceCommand)
export class CreatePriceUseCase implements ICommandHandler<CreatePriceCommand> {
  constructor(
    private readonly repository: PriceCommandRepository,
    private readonly parser: CoingeckoPriceParser,
  ) {}

  async execute(_: CreatePriceCommand): Promise<void> {
    const dto = await this.parser.parse();
    await this.repository.createPrice(dto);
  }
}