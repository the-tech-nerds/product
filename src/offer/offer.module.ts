import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  EventsModule,
} from '@the-tech-nerds/common-services';
import { Shop } from 'src/shops/entities/shop.entity';
import { FetchShopByIdService } from 'src/shops/service/shop/fetch-by-id.service';
import { CommonModule } from '../common/common.module';
import { OfferController } from './controller/offer.controller';
import { Offer } from './entities/offer.entity';
import { ActiveOffersService } from './service/active-offers.service';
import { CreateOfferService } from './service/create-offer.service';
import { DeleteOfferService } from './service/delete-offer.service';
import { ListOfferService } from './service/fetch-all-offer.service';
import { FetchOfferByIdService } from './service/fetch-by-id.service';
import { OfferDetailByIdService } from './service/offer-detail.service';
import { UpdateOfferService } from './service/update-offer.service';
import { UpdateOfferStatusService } from './service/update-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Shop]), CommonModule],
  providers: [
    CreateOfferService,
    DeleteOfferService,
    FetchOfferByIdService,
    UpdateOfferService,
    ListOfferService,
    ApiResponseService,
    ActiveOffersService,
    OfferDetailByIdService,
    FetchShopByIdService,
    UpdateOfferStatusService,
    EventsModule,
  ],
  controllers: [OfferController],
})
export class OfferModule {}
