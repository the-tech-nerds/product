import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@Injectable()
class ListOfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async execute(): Promise<Offer[]> {
    return this.offerRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }
}

export { ListOfferService };
