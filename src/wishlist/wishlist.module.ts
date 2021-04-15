import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CommonModule } from '../common/common.module';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistService } from './service/create-wishlist.service';
import { DeleteWishlistService } from './service/delete-wishlist.service';
import { WishlistController } from './controller/wishlist.controller';
import { FetchWishlistByUserIdService } from './service/fetch-by-id.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), CommonModule],
  providers: [
    CreateWishlistService,
    DeleteWishlistService,
    FetchWishlistByUserIdService,
    ApiResponseService,
  ],
  controllers: [WishlistController],
})
export class WishlistModule {}
