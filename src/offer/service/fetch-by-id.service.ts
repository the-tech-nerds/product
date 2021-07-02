import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@Injectable()
class FetchOfferByIdService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async execute(offerId: number): Promise<Offer | undefined> {
    const item = await this.offerRepository.findOne({
      id: offerId,
    });
    return item;
  }

  async getMultiOffers(offerIds: number[]): Promise<Offer[] | undefined> {
    return this.offerRepository.findByIds(offerIds);
  }
}
export { FetchOfferByIdService };
