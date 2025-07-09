import { Controller, Get, Query, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetManyPricesQuery } from './usecases';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('price')
export class PriceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getManyPrices(
    @Res() res: Response,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const now = new Date();
    const toDate = to ? new Date(to) : now;
    const fromDate = from ? new Date(from) : new Date(toDate.getTime() - 24 * 60 * 60 * 1000);

    const stream: Readable = await this.queryBus.execute(
      new GetManyPricesQuery({ from: fromDate, to: toDate }),
    );

    res.set({
      'Content-Type': 'application/x-ndjson',
      'Transfer-Encoding': 'chunked',
    });

    stream.on('data', (row) => {
      const json = JSON.stringify(row);
      res.write(json + '\n');
    });

    stream.on('end', () => {
      res.end();
    });

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).end();
    });

    res.on('close', () => {
      console.log('Client closed connection');
      stream.destroy();
    });
  }
}