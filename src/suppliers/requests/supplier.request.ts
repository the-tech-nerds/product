import { IsNotEmpty } from 'class-validator';

export class SupplierRequest {
  @IsNotEmpty({ message: 'Supplier name is required.' })
  name: string;

  description?: string;

  address?: string;

  phone?: string;

  email?: string;

  is_active?: boolean;
}
