import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePriceCommand } from './usecases';

@Injectable()
export class PriceCron {
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      await this.commandBus.execute(new CreatePriceCommand());
    } catch (error) {
      console.error('Error creating price:', error.message);
    }
  }
}