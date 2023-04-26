import { PartialType } from '@nestjs/mapped-types';
import { CreateOutageDto } from './create-outage.dto';

export class UpdateOutageDto extends PartialType(CreateOutageDto) {}
