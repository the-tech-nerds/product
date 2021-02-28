import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/products/entities/unit.entity';
import { UnitRequest } from 'src/products/requests/unit.request';
import { Repository } from 'typeorm';

@Injectable()
class CreateUnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  async create(userId: number, unitRequest: UnitRequest): Promise<Unit> {
    return this.unitRepository.save({
      ...unitRequest,
      created_by: userId,
    });
  }
}

export { CreateUnitService };
