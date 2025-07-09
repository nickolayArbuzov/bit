import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsOptional,
} from 'class-validator';

export class GetManyPricesDto {
  @ApiPropertyOptional({ example: '2024-07-01T00:00:00Z', description: 'Начало периода (ISO 8601)' })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  from?: Date;

  @ApiPropertyOptional({ example: '2024-07-09T00:00:00Z', description: 'Конец периода (ISO 8601)' })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  to?: Date;

}