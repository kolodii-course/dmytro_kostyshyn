import { Injectable } from '@nestjs/common';
import { CreateOutageDto } from './dto/create-outage.dto';
import { UpdateOutageDto } from './dto/update-outage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OutageEntity } from './entities/outage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutagesService {
  constructor(
    @InjectRepository(OutageEntity)
    private readonly outageRepository: Repository<OutageEntity>,
  ) {}

  create(createOutageDto: CreateOutageDto) {
    return this.outageRepository.save(createOutageDto);
  }

  findAll() {
    return this.outageRepository.find({ relations: ['queue'] });
  }

  findOne(id: number) {
    return this.outageRepository.findOne({
      where: { id },
      relations: ['queue'],
    });
  }

  update(id: number, updateOutageDto: UpdateOutageDto) {
    return this.outageRepository.update(id, updateOutageDto);
  }

  remove(id: number) {
    return this.outageRepository.delete(id);
  }
}
