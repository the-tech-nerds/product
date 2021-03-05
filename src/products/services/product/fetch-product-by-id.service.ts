import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class FetchProductByIdService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
  ) {}

  async execute(productId: number): Promise<Product[]> {
    return this.ProductRepository.findOne({
      id: productId,
    });
  }
}
