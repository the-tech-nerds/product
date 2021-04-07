import { IsNotEmpty } from 'class-validator';

export class ProductVarianceRequest {
  @IsNotEmpty({ message: 'Product variance title is required.' })
  title: string;

  @IsNotEmpty({ message: 'Product id is required.' })
  product_id: number;

  @IsNotEmpty({ message: 'Product variance price is required.' })
  price: number;

  sku?: string;

  color?: string;

  unit_id?: number;

  unit_value?: string;

  description?: string;
}
