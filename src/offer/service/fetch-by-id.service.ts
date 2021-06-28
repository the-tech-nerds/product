import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';
import { FileStorageService } from '../../common/file/filte.service';

@Injectable()
class FetchOfferByIdService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private fileService: FileStorageService,
  ) {}

  async execute(offerId: number): Promise<any | undefined> {
    const files = await this.fileService.getListByEntityId('offer', offerId);
    const item = await this.offerRepository.findOne({
      id: offerId,
    });
    return {
      images: files,
      offer: item,
    };
  }
}
export { FetchOfferByIdService };
