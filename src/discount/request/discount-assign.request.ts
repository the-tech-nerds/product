import { IsNotEmpty } from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariance } from '../../products/entities/product-variance.entity';
import { Offer } from '../../offer/entities/offer.entity';

export class DiscountAssignRequest {
  @IsNotEmpty({ message: 'discount is required.' })
  discount_id: number;

  products?: Product[];

  categories?: Category[];

  product_variances?: ProductVariance[];

  offers?: Offer[];
}
