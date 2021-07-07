import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { Offer } from '../entities/offer.entity';
import { OfferRequest } from '../request/offer.request';

@Injectable()
class UpdateOfferService {
  private readonly crudEvent = new CRUDEvent(Microservices.PRODUCT_SERVICE);

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
    const offer = await this.offerRepository.findOne(id);
    this.crudEvent.emit(
      'offer',
      Microservices.PRODUCT_SERVICE,
      EventTypes.UPDATE,
      JSON.stringify(offer),
    );
    return offer;
  }
}
export { UpdateOfferService };
