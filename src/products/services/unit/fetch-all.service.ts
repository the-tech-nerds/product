import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/products/entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListUnitService {
  constructor(
    @InjectRepository(Unit)
    private UnitRepository: Repository<Unit>,
  ) {}

  async execute(): Promise<Unit[]> {
    return this.UnitRepository.find();
  }
}
