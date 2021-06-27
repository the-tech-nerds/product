import { IsNotEmpty } from 'class-validator';

export class OfferRequest {
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  description: string;

  @IsNotEmpty({ message: 'Details is required.' })
  offer_detail: string;

  @IsNotEmpty({ message: 'Details is required.' })
  total_price: number;

  start_date: Date;

  end_date: Date;

  status: number;
}
