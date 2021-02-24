import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/products/entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FetchUnitByIdService {
  constructor(
    @InjectRepository(Unit)
    private UnitRepository: Repository<Unit>,
  ) {}

  async execute(UnitId: number): Promise<Unit | undefined> {
    return this.UnitRepository.findOne({
      id: UnitId,
    });
  }
}
