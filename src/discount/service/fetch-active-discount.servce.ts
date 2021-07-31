import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { ProductVariance } from 'src/products/entities/product-variance.entity';
import { LocalDateToUtc } from 'src/utils/date-time-conversion/date-time-conversion';
import { IsNull, MoreThanOrEqual, Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
class FetchActiveDiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async execute(): Promise<Discount[]> {
    return this.discountRepository.find({
      where: {
        deleted_at: IsNull(),
        end_date: MoreThanOrEqual(LocalDateToUtc(new Date())),
        status: 1,
      },
    });
  }

  checkDiscount(products: any, discount: Discount[]) {
    products.forEach((prod: any) => {
      prod.discount = {
        product: null,
        category: null,
        variance: null,
      };
      const vDiscountIds =
        prod.productVariances
          .map((p: ProductVariance) => p.discount_id)
          ?.filter(
            (v: any, i: any, a: any) => v !== null && a.indexOf(v) === i,
          ) || [];
      const cDiscountIds =
        prod.categories
          .map((c: Category) => c.discount_id)
          ?.filter(
            (v: any, i: any, a: any) => v !== null && a.indexOf(v) === i,
          ) || [];

      // get product discount
      if (prod.discount_id) {
        prod.discount.product = discount.find(x => x.id === prod.discount_id);
      }
      // get variance discount
      if (prod.productVariances && vDiscountIds.length > 0) {
        prod.discount.variance = discount.filter(x =>
          x.id.toString().includes(vDiscountIds),
        );
      }
      // get categories discount
      if (prod.categories && cDiscountIds.length > 0) {
        prod.discount.category = discount.filter(x =>
          x.id.toString().includes(cDiscountIds),
        );
      }
    });
    return products;
  }
}

export { FetchActiveDiscountService };
