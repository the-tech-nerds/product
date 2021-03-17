import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductRequest } from 'src/products/requests/product.request';
import { Repository } from 'typeorm';

@Injectable()
class CreateProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    userId: number,
    productRequest: ProductRequest,
  ): Promise<Product> {
    console.log('pr create in service req: ', productRequest);
    return this.productRepository.save({
      ...productRequest,
      created_by: userId,
    });
  }
}

export { CreateProductService };
