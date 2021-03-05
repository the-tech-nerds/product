import { IsNotEmpty } from 'class-validator';

export class ProductRequest {
  @IsNotEmpty({ message: 'Product name is required.' })
  name: string;

  @IsNotEmpty({ message: 'Price is required.' })
  price: number;

  brand_id?: number;

  category_id?: number;

  shop_id?: number;

  status?: number;
}
