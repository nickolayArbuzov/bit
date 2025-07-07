import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty()
  @IsInt()
  price_usd: number;

  @ApiProperty()
  @IsDate()
  timestamp: string;
}

