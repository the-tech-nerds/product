import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariance } from '../../entities/product-variance.entity';
import { FileStorageService } from '../../../common/file/filte.service';

@Injectable()
export class FetchProductVarianceByIdService {
  constructor(
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
    private fileService: FileStorageService,
  ) {}

  async execute(id: number): Promise<any | undefined> {
    const images = await this.fileService.getListByEntityId(
      'product-variance',
      id,
    );
    const productVariance = await this.productVarianceRepository.findOneOrFail(
      id,
      {
        relations: ['shops'],
      },
    );

    return {
      images,
      productVariance,
    };
  }

  async getMultiProductVariances(
    varianceIds: number[],
  ): Promise<ProductVariance[] | undefined> {
    return this.productVarianceRepository.findByIds(varianceIds);
  }
}
