import { IsNotEmpty } from 'class-validator';

export class ProductRequest {
  @IsNotEmpty({ message: 'Product title is required.' })
  title: string;

  @IsNotEmpty({ message: 'Price is required.' })
  price: number;
}
