import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from '../price.entity';

@Injectable()
export class PriceQueryRepository {
    constructor(
        @InjectRepository(Price)
        private readonly repository: Repository<Price>,
    ) {}

    async getManyPrices(): Promise<any> {
        const rawData = await this.repository.query(
            `
                SELECT
                    "price".id AS price_id,
                    "price".price_usd AS price_price_usd,
                    "price".timestamp AS price_timestamp
                FROM "price"
            `, 
        []);
        const mapQueryResultToJson = (rawData, columnHeaders) => {}
    }
}