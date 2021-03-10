import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
class DeleteProductService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
  ) {}

  async execute(id: number): Promise<any> {
    return this.ProductRepository.softDelete(id);
  }
}

export { DeleteProductService };
