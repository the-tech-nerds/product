import { IsNotEmpty } from 'class-validator';

export class ShopRequest {
  @IsNotEmpty({ message: 'Product title is required.' })
  name: string;

  description?: string;

  address?: string;
}
