import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { Shop } from 'src/shops/entities/shop.entity';
import { FetchShopByIdService } from 'src/shops/service/shop/fetch-by-id.service';
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
    private shopByIdsService: FetchShopByIdService,
  ) {}

  async create(userId: number, offerRequest: OfferRequest): Promise<Offer> {
    const offer = await this.offerRepository.save({
      name: offerRequest.name,

      description: offerRequest.description,

      offer_detail: offerRequest.offer_detail,

      total_price: offerRequest.total_price,

      start_date: offerRequest.start_date,

      end_date: offerRequest.end_date,

      status: offerRequest.status,

      stock: offerRequest.stock,
      shop_ids: offerRequest.shops,
      created_by: userId,
      slug: convertToSlug(offerRequest.name),
    });
    let shops: Shop[] | null | undefined = null;
    if (offerRequest.shops) {
      shops = await this.shopByIdsService.getMultiShops(offerRequest.shops);
      if (!shops) {
        throw new BadRequestException('Not the valid shops');
      }
    }
    offer.shops = shops || [];
    const result = await this.offerRepository.save(offer);
    this.crudEvent.emit(
      'offer',
      Microservices.PRODUCT_SERVICE,
      EventTypes.CREATE,
      JSON.stringify(result),
    );

    return result;
  }
}

export { CreateOfferService };
