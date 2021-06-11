import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Offer } from '../entities/offer.entity';
import { OfferRequest } from '../request/offer.request';

@Injectable()
class UpdateOfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async execute(
    id: number,
    userId: number,
    offerRequest: OfferRequest,
  ): Promise<Offer | undefined> {
    await this.offerRepository.update(id, {
      ...offerRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.offerRepository.findOne(id);
  }
}
export { UpdateOfferService };
