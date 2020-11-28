import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ListProductsService } from './services/list-products.service';
import { ApiResponseService } from '../utils/services/api-response/response/api-response.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([Product])
  ],
  providers: [
    ListProductsService,
    ApiResponseService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
