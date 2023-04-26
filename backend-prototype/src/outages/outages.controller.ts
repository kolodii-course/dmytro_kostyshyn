import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OutagesService } from './outages.service';
import { CreateOutageDto } from './dto/create-outage.dto';
import { UpdateOutageDto } from './dto/update-outage.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OutageEntity } from './entities/outage.entity';

@ApiTags('Outages')
@Controller('outages')
export class OutagesController {
  constructor(private readonly outagesService: OutagesService) {}

  @ApiCreatedResponse({ type: OutageEntity })
  @Post()
  create(@Body() createOutageDto: CreateOutageDto) {
    return this.outagesService.create(createOutageDto);
  }

  @ApiOkResponse({ type: OutageEntity, isArray: true })
  @Get()
  findAll() {
    return this.outagesService.findAll();
  }

  @ApiOkResponse({ type: OutageEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutageDto: UpdateOutageDto) {
    return this.outagesService.update(+id, updateOutageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outagesService.remove(+id);
  }
}
