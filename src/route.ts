import { Routes } from 'nest-router';
import { ProductModule } from './products/product.module';
import { ShopModule } from './shops/shop.module';

export const routes: Routes = [
  {
    path: '/product',
    module: ProductModule,
  },
  {
    path: '/shop',
    module: ShopModule,
  },
];
