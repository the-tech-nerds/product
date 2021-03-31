import { IsNotEmpty } from 'class-validator';

export class InventoryRequest {
  @IsNotEmpty({ message: 'Product Variance is required.' })
  product_variance_id: number;

  @IsNotEmpty({ message: 'Stock quantity is required.' })
  stock_count: number;

  @IsNotEmpty({ message: 'Price is required.' })
  price: number;

  @IsNotEmpty({ message: 'Shop is required.' })
  shop_ids: number[];

  status?: number;

  stock_in_time?: Date;
}
