import { IsNotEmpty } from 'class-validator';

export class OfferRequest {
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  offer_info: string;

  total_price: number;

  discount_id?: number;

  start_date: Date;

  end_date: Date;

  status: number;
}
