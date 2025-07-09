import { Module } from '@nestjs/common';
import { CoingeckoPriceParser } from './coingecko.parser';

@Module({
  providers: [CoingeckoPriceParser],
  exports: [CoingeckoPriceParser], 
})
export class ParserModule {}