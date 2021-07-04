import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  EventsModule,
} from '@the-tech-nerds/common-services';
import { CommonModule } from '../common/common.module';
import { OfferController } from './controller/offer.controller';
import { Offer } from './entities/offer.entity';
import { CreateOfferService } from './service/create-offer.service';
import { DeleteOfferService } from './service/delete-offer.service';
import { ListOfferService } from './service/fetch-all-offer.service';
import { FetchOfferByIdService } from './service/fetch-by-id.service';
import { UpdateOfferService } from './service/update-offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), CommonModule],
  providers: [
    CreateOfferService,
    DeleteOfferService,
    FetchOfferByIdService,
    UpdateOfferService,
    ListOfferService,
    ApiResponseService,
    EventsModule,
  ],
  controllers: [OfferController],
})
export class OfferModule {}
