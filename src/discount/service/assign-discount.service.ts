import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  CRUDEvent,
  EventTypes,
  Microservices,
} from '@the-tech-nerds/common-services';
import { FetchVariancesByIdsService } from 'src/categories/service/fetch-variance-by-ids.service';
import { Discount } from '../entities/discount.entity';
import { Product } from '../../products/entities/product.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';
import { LocalDateToUtc } from '../../utils/date-time-conversion/date-time-conversion';
import { Offer } from '../../offer/entities/offer.entity';
import { DiscountAssignRequest } from '../request/discount-assign.request';
import { DiscountItems } from '../DiscountItems';
import { DiscountItemTypes } from '../DiscountItemTypes';

@Injectable()
class AssignDiscountService {
  private readonly crudEvent = new CRUDEvent(Microservices.PRODUCT_SERVICE);

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
    private fetchVariancesByIdsService: FetchVariancesByIdsService,
  ) {}

  async execute(
    userId: number,
    discountRequest: DiscountAssignRequest,
  ): Promise<Discount> {
    const discount = await this.discountRepository.findOneOrFail(
      discountRequest.discount_id,
    );

    const discountItems = new DiscountItems();

    const updateEntity = {
      discount_id: discount.id,
      updated_by: userId,
      updated_at: LocalDateToUtc(new Date()),
    };

    await this.resetDiscount(discountRequest);

    if (discountRequest.categories) {
      discountItems.item_type = DiscountItemTypes.CATEGORY;
      discountItems.items = discountRequest.categories;
      const variances =
        (await this.fetchVariancesByIdsService.execute(
          discountRequest.categories.map(x => x.id),
        )) || [];
      variances?.forEach(ele => {
        ele.discounted_price = this.calculateDiscount(discount, ele.price);
        ele.discount_id = discount.id;
      });

      await this.categoryRepository.update(
        { id: In(discountRequest.categories.map(x => x.id)) },
        updateEntity,
      );

      await this.productVarianceRepository.save(variances);
    }

    if (discountRequest.products) {
      discountItems.item_type = DiscountItemTypes.PRODUCT;
      discountItems.items = discountRequest.products;

      await this.productRepository.update(
        { id: In(discountRequest.products.map(x => x.id)) },
        updateEntity,
      );
    }

    if (discountRequest.product_variances) {
      discountItems.item_type = DiscountItemTypes.PRODUCT_VARIANCE;
      discountItems.items = discountRequest.product_variances;

      await this.productVarianceRepository.update(
        { id: In(discountRequest.product_variances.map(x => x.id)) },
        updateEntity,
      );
    }

    if (discountRequest.offers) {
      discountItems.item_type = DiscountItemTypes.OFFER;
      discountItems.items = discountRequest.offers;

      await this.offerRepository.update(
        { id: In(discountRequest.offers.map(x => x.id)) },
        updateEntity,
      );
    }

    discount.is_assigned = 1;

    const updatedDiscount = await this.discountRepository.save(discount);

    const discountInfo = {
      ...updatedDiscount,
      discountItems,
    };

    // console.log('discount info', discountInfo);

    this.crudEvent.emit(
      'discount',
      Microservices.PRODUCT_SERVICE,
      EventTypes.CREATE,
      JSON.stringify(discountInfo),
    );

    return updatedDiscount;
  }

  protected async resetDiscount(
    discountRequest: DiscountAssignRequest,
  ): Promise<void> {
    await this.categoryRepository.update(
      { discount_id: discountRequest.discount_id },
      { discount_id: null },
    );

    await this.productRepository.update(
      { discount_id: discountRequest.discount_id },
      { discount_id: null },
    );

    await this.productVarianceRepository.update(
      { discount_id: discountRequest.discount_id },
      { discount_id: null },
    );

    await this.offerRepository.update(
      { discount_id: discountRequest.discount_id },
      { discount_id: null },
    );
  }

  private calculateDiscount(discount: Discount, varianceAmount: number) {
    if (discount.discount_percentage) {
      return (
        varianceAmount - varianceAmount * (discount.discount_percentage / 100)
      );
    }
    return varianceAmount - discount.discount_amount;
  }
}

export { AssignDiscountService };
