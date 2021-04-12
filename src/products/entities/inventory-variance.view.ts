import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { ProductVariance } from './product-variance.entity';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('variance.id', 'id')
      .addSelect('variance.title', 'variance_name')
      .addSelect('variance.price', 'variance_price')
      .addSelect('variance.product_id', 'product_id')
      .addSelect('inventory.price', 'stock_price')
      .addSelect('inventory.stock_count', 'stock_count')
      .from(ProductVariance, 'variance')
      .leftJoin(
        Inventory,
        'inventory',
        'inventory.product_variance_id = variance.id',
      ),
})
export class InventoryVariance {
  @ViewColumn()
  id: number;

  @ViewColumn()
  variance_name: string;

  @ViewColumn()
  variance_price: number;

  @ViewColumn()
  stock_price: number;

  @ViewColumn()
  product_id: number;

  @ViewColumn()
  stock_count: number;
}
