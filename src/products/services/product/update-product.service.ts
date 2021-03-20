import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalDateToUtc } from '../../../utils/date-time-conversion/date-time-conversion';
import { ProductRequest } from '../../requests/product.request';
import { Product } from '../../entities/product.entity';

@Injectable()
class UpdateProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(
    id: number,
    userId: number,
    productRequest: ProductRequest,
  ): Promise<Product | undefined> {
    await this.productRepository.update(id, {
      ...productRequest,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    });
    return this.productRepository.findOne(id);
  }

  async changeStatus(id: number): Promise<Product | undefined | void> {
    const product = await this.productRepository.findOneOrFail(id, {});
    product.status = !product.status;
    return this.productRepository.save(product);
  }
}

export { UpdateProductService };
