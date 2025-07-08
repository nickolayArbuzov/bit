import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from '../price.entity';
import { CreatePriceDto } from '../price.dto';

@Injectable()
export class PriceCommandRepository {
    constructor(
        @InjectRepository(Price)
        private readonly repository: Repository<Price>,
    ) {}

    async createPrice(createPriceDto: CreatePriceDto): Promise<any> {
        const entity = this.repository.create(createPriceDto);
        return await this.repository.save(entity);
    }

    async seedPrice(seedPriceDto: CreatePriceDto[]): Promise<any> {
        const entity = this.repository.create(seedPriceDto);
        return await this.repository.save(entity);
    }
}
