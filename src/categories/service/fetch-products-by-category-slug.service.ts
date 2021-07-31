import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { FileStorage } from 'src/common/file/entities/storage.entity';
import {
  paginate,
  Paginated,
  PaginateQuery,
} from '@the-tech-nerds/common-services';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FetchProductsByCategorySlugService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(
    slug: string,
    shopId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Product>> {
    let queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.productVariances', 'variants')
      .leftJoinAndSelect('variants.unit', 'unit')
      .leftJoinAndSelect('variants.shops', 'shops')
      // .leftJoinAndSelect('variants.images', 'images')
      .where('product.status = :status', { status: 1 })
      .andWhere('categories.slug = :slug', { slug });

    if (shopId) {
      queryBuilder = queryBuilder.andWhere('shops.id = :shopId', {
        shopId: Number(shopId),
      });
    }

    queryBuilder = queryBuilder.select([
      'product.id',
      'product.name',
      'product.discount_id',
      'product.description',
      'product.status',
      'product.supplier_id',
      'product.brand_id',
      'product.slug',
      'product.image',
      'categories.id',
      'categories.discount_id',
      // 'categories.slug',
      // 'categories.type_id',
      // 'categories.parent_id',
      // 'categories.is_active',
      'variants.id',
      'variants.title',
      'variants.sku',
      'variants.price',
      'variants.color',
      'variants.unit_id',
      'variants.status',
      'variants.description',
      'variants.discount_id',
      'variants.unit_value',
      'variants.product_id',
      'variants.image',
      'unit.id',
      'unit.name',
      'unit.description',
      'shops.id',
      // 'images.url',
      // 'images.product_variance_id',
    ]);

    return paginate(query, queryBuilder, Product, {
      sortableColumns: ['id'],
      searchableColumns: ['name', 'slug'],
      defaultSortBy: [['id', 'ASC']],
    });
  }
}
