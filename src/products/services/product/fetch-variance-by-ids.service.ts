import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class FetchVariancesByProductIdsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(ids: number[]): Promise<ProductVariance[] | undefined> {
    let variances: ProductVariance[] = [];
    const items = await this.productRepository.find({
      relations: ['productVariances'],
      where: {
        id: In(ids),
      },
    });
    items.forEach(element => {
      variances = variances.concat(element.productVariances);
    });
    return variances;
  }
}
