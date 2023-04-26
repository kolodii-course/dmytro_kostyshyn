import { ApiProperty } from '@nestjs/swagger';
import { OutageEntity } from 'src/outages/entities/outage.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('queues')
export class QueueEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => OutageEntity, (outage) => outage.queue)
  outages?: OutageEntity[];
}
