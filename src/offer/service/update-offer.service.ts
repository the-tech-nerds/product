import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { convertToSlug } from 'src/utils/utils';
import { Shop } from 'src/shops/entities/shop.entity';
import { FetchShopByIdService } from 'src/shops/service/shop/fetch-by-id.service';
import { Offer } from '../entities/offer.entity';
import { OfferRequest } from '../request/offer.request';

@Injectable()
class UpdateOfferService {
  private readonly crudEvent = new CRUDEvent(Microservices.PRODUCT_SERVICE);

  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private shopByIdsService: FetchShopByIdService,
  ) {}

  async execute(
    id: number,
    userId: number,
    offerRequest: OfferRequest,
  ): Promise<Offer | undefined> {
    const shopIds = offerRequest.shops || null;
    if (!shopIds) {
      throw new BadRequestException('Not the valid shops');
    }
    await this.offerRepository.update(id, {
      name: offerRequest.name,

      description: offerRequest.description,

      offer_detail: offerRequest.offer_detail,

      total_price: offerRequest.total_price,

      start_date: offerRequest.start_date,

      end_date: offerRequest.end_date,

      status: offerRequest.status,

      stock: offerRequest.stock,
      updated_by: userId,
      slug: convertToSlug(offerRequest.name),
      updated_at: LocalDateToUtc(new Date()),
    });
    let shops: Shop[] | null | undefined = null;
    if (shopIds) {
      shops = await this.shopByIdsService.getMultiShops(shopIds);
      if (!shops) {
        throw new BadRequestException('Not the valid shops');
      }
    }
    const offer = await this.offerRepository.findOneOrFail(id);
    offer.shops = shops || [];
    await this.offerRepository.save(offer);

    const result = await this.offerRepository.findOneOrFail(id);

    this.crudEvent.emit(
      'offer',
      Microservices.PRODUCT_SERVICE,
      EventTypes.UPDATE,
      JSON.stringify(result),
    );
    return offer;
  }
}
export { UpdateOfferService };
