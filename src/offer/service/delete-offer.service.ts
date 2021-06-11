import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@Injectable()
class DeleteOfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async execute(id: number): Promise<UpdateResult> {
    return this.offerRepository.softDelete(id);
  }
}

export { DeleteOfferService };
