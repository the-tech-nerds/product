import { IsNotEmpty } from 'class-validator';

export class InventoryUpdateRequest {
  @IsNotEmpty({ message: 'Stock quantity is required.' })
  stock_count: number;

  @IsNotEmpty({ message: 'Price is required.' })
  price: number;

  shop_ids?: number[];

  stock_in_time?: Date;
}
