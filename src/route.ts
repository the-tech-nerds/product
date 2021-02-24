import { Routes } from 'nest-router';
import { ProductModule } from './products/product.module';
import { ShopModule } from './shops/shop.module';
import { CategoryModule } from './categories/category.module';

export const routes: Routes = [
  {
    path: '/product',
    module: ProductModule,
  },
  {
    path: '/shop',
    module: ShopModule,
  },
  {
    path: '/category',
    module: CategoryModule,
  },
];
