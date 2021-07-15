import { IsNotEmpty } from 'class-validator';

export class DiscountAssignRequest {
  @IsNotEmpty({ message: 'discount is required.' })
  discount_id: number;

  product_ids?: number[];

  category_ids?: number[];

  product_variance_ids?: number[];

  offer_ids?: number[];
}
