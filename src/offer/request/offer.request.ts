export class OfferRequest {
  name: string;

  description: string;

  offer_detail: string;

  total_price: number;

  start_date: Date;

  end_date: Date;

  status: number;

  stock: number;

  shops?: number[];
}

export interface ShopOffer {
  id: number;
  name: string;
  description?: string;
  address?: string;
  type_id?: number;
}
