import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/products/entities/unit.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
class DeleteUnitService {
  constructor(
    @InjectRepository(Unit)
    private UnitRepository: Repository<Unit>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.UnitRepository.softDelete(id);
  }
}

export { DeleteUnitService };
