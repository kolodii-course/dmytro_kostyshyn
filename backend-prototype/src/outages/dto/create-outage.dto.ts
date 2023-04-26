import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';

export class CreateOutageDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  queueId!: number;

  @ApiProperty()
  @IsDateString()
  startAt!: Date;

  @ApiProperty()
  @IsDateString()
  endAt!: Date;
}
