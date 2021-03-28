import { IsNotEmpty } from 'class-validator';

export class ShopRequest {
  @IsNotEmpty({ message: 'Shop name is required.' })
  name: string;

  description?: string;

  address?: string;

  type_id?: number;
}
