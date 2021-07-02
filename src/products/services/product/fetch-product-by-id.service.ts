import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { FileStorageService } from '../../../common/file/filte.service';

@Injectable()
export class FetchProductByIdService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private fileService: FileStorageService,
  ) {}

  async execute(productId: number): Promise<any | undefined> {
    const images = await this.fileService.getListByEntityId(
      'product',
      productId,
    );
    const product = await this.productRepository.findOne(productId, {
      relations: ['categories'],
    });

    return {
      images,
      product,
    };
  }

  async getMultiProducts(productIds: number[]): Promise<Product[] | undefined> {
    return this.productRepository.findByIds(productIds);
  }
}
