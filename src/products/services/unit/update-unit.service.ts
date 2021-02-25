import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Unit } from 'src/products/entities/unit.entity';
import { UnitRequest } from '../../requests/unit.request';

@Injectable()
class UpdateUnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  async execute(
    id: number,
    userId: number,
    unitRequest: UnitRequest,
  ): Promise<Unit | undefined> {
    await this.unitRepository.update(id, {
      ...unitRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.unitRepository.findOne(id);
  }
}

export { UpdateUnitService };
