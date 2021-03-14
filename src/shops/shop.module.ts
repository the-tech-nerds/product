import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { CommonModule } from 'src/common/common.module';
import { DeleteShopService } from './service/shop/delete.service';
import { ListShopService } from './service/shop/fetch-all.service';
import { CreateShopService } from './service/shop/create-shop.service';
import { UpdateShopService } from './service/shop/update-shop.service';
import { FetchShopByIdService } from './service/shop/fetch-by-id.service';
import { Shop } from './entities/shop.entity';
import { ShopController } from './controller/shop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), CommonModule],
  providers: [
    CreateShopService,
    UpdateShopService,
    DeleteShopService,
    FetchShopByIdService,
    ListShopService,
    ApiResponseService,
  ],
  controllers: [ShopController],
})
export class ShopModule {}
