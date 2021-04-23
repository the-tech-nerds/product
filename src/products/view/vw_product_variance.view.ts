import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductVariance } from '../entities/product-variance.entity';
import { Unit } from '../entities/unit.entity';
@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('variance.id', 'id')
      .addSelect('variance.title', 'variance_name')
      .addSelect('variance.price', 'variance_price')
      .addSelect('variance.product_id', 'product_id')
      .addSelect('product.name', 'product_name')
      .addSelect('product.slug', 'product_slug')
      .addSelect('variance.unit_value', 'unit_value')
      .addSelect('unit.name', 'unit_name')
      .from(ProductVariance, 'variance')
      .leftJoin(Product, 'product', 'product.id = variance.product_id')
      .leftJoin(Unit, 'unit', 'variance.unit_id = unit.id'),
})
export class VwProductVariance {
  @ViewColumn()
  id: number;

  @ViewColumn()
  variance_name: string;

  @ViewColumn()
  variance_price: number;

  @ViewColumn()
  product_id: number;

  @ViewColumn()
  product_name: string;

  @ViewColumn()
  product_slug: string;

  @ViewColumn()
  unit_value: string;

  @ViewColumn()
  unit_name: string;
}
