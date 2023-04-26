import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEntity } from './entities/queue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueuesService {
  constructor(
    @InjectRepository(QueueEntity)
    private readonly queueRepository: Repository<QueueEntity>,
  ) {}

  create(createQueueDto: CreateQueueDto) {
    return this.queueRepository.save(createQueueDto);
  }

  findAll() {
    return this.queueRepository.find();
  }

  findOne(id: number) {
    return this.queueRepository.findOneBy({ id });
  }

  update(id: number, updateQueueDto: UpdateQueueDto) {
    return this.queueRepository.update(id, updateQueueDto);
  }

  remove(id: number) {
    return this.queueRepository.delete(id);
  }
}
