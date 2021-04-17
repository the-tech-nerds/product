import { IsNotEmpty } from 'class-validator';

export class ProductRequest {
  @IsNotEmpty({ message: 'Product name is required.' })
  name: string;

  description?: string;

  brand_id?: number;

  category_ids?: number[];

  status?: boolean;
}
