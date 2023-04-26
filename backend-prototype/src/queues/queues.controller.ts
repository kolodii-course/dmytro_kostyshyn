import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueuesService } from './queues.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueueEntity } from './entities/queue.entity';

@ApiTags('Queues')
@Controller('queues')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @ApiCreatedResponse({ type: QueueEntity })
  @Post()
  create(@Body() createQueueDto: CreateQueueDto) {
    return this.queuesService.create(createQueueDto);
  }

  @ApiOkResponse({ type: QueueEntity, isArray: true })
  @Get()
  findAll() {
    return this.queuesService.findAll();
  }

  @ApiOkResponse({ type: QueueEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
    return this.queuesService.update(+id, updateQueueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queuesService.remove(+id);
  }
}
