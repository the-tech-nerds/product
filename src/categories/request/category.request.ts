import { IsNotEmpty } from 'class-validator';

export class CategoryRequest {
  @IsNotEmpty({ message: 'Product title is required.' })
  name: string;

  parent_id?: number;
}
