import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';
import { Product } from '../../products/entities/product.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';
import { Offer } from '../../offer/entities/offer.entity';
import { DiscountAssignRequest } from '../request/discount-assign.request';

@Injectable()
class AssignDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariance)
    private productVarianceRepository: Repository<ProductVariance>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async execute(
    userId: number,
    discountRequest: DiscountAssignRequest,
  ): Promise<Discount> {
    const discount = await this.discountRepository.findOneOrFail(
      discountRequest.discount_id,
    );

    const updateEntity = {
      discount_id: discount.id,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    };

    if (discountRequest.category_ids) {
      await this.categoryRepository.update(
        { discount_id: discountRequest.discount_id },
        { discount_id: 0 },
      );

      await this.categoryRepository.update(
        { id: In(discountRequest.category_ids) },
        updateEntity,
      );
    }

    if (discountRequest.product_ids) {
      await this.productRepository.update(
        { discount_id: discountRequest.discount_id },
        { discount_id: 0 },
      );

      await this.productRepository.update(
        { id: In(discountRequest.product_ids) },
        updateEntity,
      );
    }

    if (discountRequest.product_variance_ids) {
      await this.productVarianceRepository.update(
        { discount_id: discountRequest.discount_id },
        { discount_id: 0 },
      );

      await this.productVarianceRepository.update(
        { id: In(discountRequest.product_variance_ids) },
        updateEntity,
      );
    }

    if (discountRequest.offer_ids) {
      await this.offerRepository.update(
        { discount_id: discountRequest.discount_id },
        { discount_id: 0 },
      );

      await this.offerRepository.update(
        { id: In(discountRequest.offer_ids) },
        updateEntity,
      );
    }

    discount.is_assigned = 1;
    return this.discountRepository.save(discount);
  }
}

export { AssignDiscountService };
