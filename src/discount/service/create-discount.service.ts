import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';
import { DiscountRequest } from '../request/discount.request';
import { Product } from '../../products/entities/product.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';
import { Offer } from '../../offer/entities/offer.entity';

@Injectable()
class CreateDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
    private categoryRepository: Repository<Category>,
    private productRepository: Repository<Product>,
    private productVarianceRepository: Repository<ProductVariance>,
    private offerRepository: Repository<Offer>,
  ) {}

  async create(
    userId: number,
    discountRequest: DiscountRequest,
  ): Promise<Discount> {
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      name,
      discount_amount,
      discount_percentage,
      start_date,
      end_date,
    } = discountRequest;

    const discount = await this.discountRepository.save({
      name,
      discount_amount,
      discount_percentage,
      start_date,
      end_date,
      created_by: userId,
    });

    const updateEntity = {
      discount_id: discount.id,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    };

    if (discountRequest.category_ids) {
      await this.categoryRepository.update(
        discountRequest.category_ids,
        updateEntity,
      );
    }

    if (discountRequest.product_ids) {
      await this.productRepository.update(
        discountRequest.product_ids,
        updateEntity,
      );
    }

    if (discountRequest.product_variance_ids) {
      await this.productVarianceRepository.update(
        discountRequest.product_variance_ids,
        updateEntity,
      );
    }

    if (discountRequest.offer_ids) {
      await this.offerRepository.update(
        discountRequest.offer_ids,
        updateEntity,
      );
    }

    return discount;
  }
}

export { CreateDiscountService };
