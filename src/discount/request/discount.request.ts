import { IsNotEmpty } from 'class-validator';

export class DiscountRequest {
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  product_id?: number;

  category_id?: number;

  product_variance_id?: number;

  discount_percentage?: number;

  discount_amount?: number;

  start_date: Date;

  end_date: Date;

  status: number;
}
