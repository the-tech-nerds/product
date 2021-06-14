import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';
import { OfferRequest } from '../request/offer.request';

@Injectable()
class CreateOfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(userId: number, offerRequest: OfferRequest): Promise<Offer> {
    return this.offerRepository.save({
      ...offerRequest,
      created_by: userId,
    });
  }
}

export { CreateOfferService };
