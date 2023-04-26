import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { QueueEntity } from './entities/queue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QueueEntity])],
  controllers: [QueuesController],
  providers: [QueuesService],
})
export class QueuesModule {}
