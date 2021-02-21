import { IsNotEmpty } from 'class-validator';

export class UnitRequest {
  @IsNotEmpty({ message: 'Unit name is required.' })
  name: string;

  description?: string;
}
