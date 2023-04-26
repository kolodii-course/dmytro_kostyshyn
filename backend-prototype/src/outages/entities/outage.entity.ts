import { ApiProperty } from '@nestjs/swagger';
import { QueueEntity } from 'src/queues/entities/queue.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('outages')
export class OutageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ type: () => QueueEntity })
  @ManyToOne(() => QueueEntity, (queue) => queue.outages)
  @JoinColumn({ name: 'queueId' })
  queue?: QueueEntity;

  @Column({select: false})
  queueId!: number;

  @ApiProperty()
  @Column()
  startAt!: Date;

  @ApiProperty()
  @Column()
  endAt!: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
