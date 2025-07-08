import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreatePriceDto } from '../features/price/price.dto';

@Injectable()
export class CoingeckoPriceParser {
  async parse(): Promise<CreatePriceDto> {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    );
    console.log('data-------------',data)
    return {
      price_usd: data.bitcoin.usd,
      timestamp: new Date(),
    };
  }

  async fetchHistory(from: Date, to: Date): Promise<CreatePriceDto[]> {
    const msFrom = Math.floor(from.getTime() / 1000);
    const msTo = Math.floor(to.getTime() / 1000);

    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range',
      {
        params: {
          vs_currency: 'usd',
          from: msFrom,
          to: msTo,
        },
      },
    );

    return data.prices.map(([timestamp, price_usd]) => ({
      price_usd,
      timestamp: new Date(timestamp),
    }));
  }
}