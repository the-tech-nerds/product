import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ListProductsService } from './services/list-products.service';
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ListProductsService, ApiResponseService],
  controllers: [ProductController],
})
export class ProductModule {}
