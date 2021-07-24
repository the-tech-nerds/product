import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { Offer, OfferStatusType } from '../entities/offer.entity';

@Injectable()
class UpdateOfferStatusService {
  private readonly crudEvent = new CRUDEvent(Microservices.PRODUCT_SERVICE);

  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async execute(
    id: number,
    status: OfferStatusType,
  ): Promise<Offer | undefined> {
    const offer = await this.offerRepository.findOneOrFail(id);
    await this.offerRepository.save({
      ...offer,
      status,
    });

    this.crudEvent.emit(
      'offer',
      Microservices.PRODUCT_SERVICE,
      EventTypes.UPDATE,
      JSON.stringify(offer),
    );
    return offer;
  }
}
export { UpdateOfferStatusService };
