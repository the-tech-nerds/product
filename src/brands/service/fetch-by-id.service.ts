import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileStorageService } from 'src/common/file/filte.service';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@Injectable()
class FetchBrandByIdService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private fileService: FileStorageService,
  ) {}

  async execute(brandId: number): Promise<any | undefined> {
    const files = await this.fileService.getListByEntityId('brand', brandId);
    const item = await this.brandRepository.findOne({
      id: brandId,
    });
    return {
      images: files,
      brand: item,
    };
  }
}
export { FetchBrandByIdService };
