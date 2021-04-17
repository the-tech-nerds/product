import { IsNotEmpty } from 'class-validator';

export class BrandRequest {
  @IsNotEmpty({ message: 'Brand name is required.' })
  name: string;

  supplier_id?: number;

  description?: string;

  is_active?: boolean;
}
