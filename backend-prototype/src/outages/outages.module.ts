import { Module } from '@nestjs/common';
import { OutagesService } from './outages.service';
import { OutagesController } from './outages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutageEntity } from './entities/outage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OutageEntity])],
  controllers: [OutagesController],
  providers: [OutagesService],
})
export class OutagesModule {}
