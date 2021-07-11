import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';
import { FileStorageService } from '../../common/file/filte.service';

@Injectable()
class OfferDetailByIdService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private fileService: FileStorageService,
  ) {}

  async execute(slug: string): Promise<any | undefined> {
    console.log(slug);
    const item = await this.offerRepository.findOne({
      slug,
    });
    const files = await this.fileService.getListByEntityId(
      'offers',
      Number(item?.id),
    );

    return {
      images: files,
      offer: item,
    };
  }
}
export { OfferDetailByIdService };
