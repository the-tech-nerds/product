import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { convertToSlug } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';
import { OfferRequest } from '../request/offer.request';

@Injectable()
class CreateOfferService {
  private readonly crudEvent = new CRUDEvent(Microservices.PRODUCT_SERVICE);

  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(userId: number, offerRequest: OfferRequest): Promise<Offer> {
    const offer = await this.offerRepository.save({
      ...offerRequest,
      created_by: userId,
      slug: convertToSlug(offerRequest.name),
    });

    this.crudEvent.emit(
      'offer',
      Microservices.PRODUCT_SERVICE,
      EventTypes.CREATE,
      JSON.stringify(offer),
    );

    return offer;
  }
}

export { CreateOfferService };
