import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Paginated,
  PaginateQuery,
} from '@the-tech-nerds/common-services';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@Injectable()
class ActiveOffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async execute(query: PaginateQuery): Promise<Paginated<Offer>> {
    let queryBuilder = this.offerRepository
      .createQueryBuilder('offer')
      // .leftJoinAndSelect('variants.shops', 'shops')
      .where('offer.status = :status', { status: 1 })
      .andWhere('offer.end_date >= :date', {
        date: LocalDateToUtc(new Date()),
      });

    //   if (shopId) {
    //     queryBuilder = queryBuilder.andWhere('shops.id = :shopId', {
    //       shopId: Number(shopId),
    //     });
    //   }

    queryBuilder = queryBuilder.select([
      'offer.id',
      'offer.name',
      'offer.description',
      'offer.status',
      'offer.total_price',
      'offer.offer_detail',
      'offer.start_date',
      'offer.image',
      'offer.end_date',
      'offer.slug',
      'offer.stock',
    ]);

    return paginate(query, queryBuilder, Offer, {
      sortableColumns: ['id'],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'ASC']],
    });
  }
}

export { ActiveOffersService };
