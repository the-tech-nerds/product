import { Routes } from 'nest-router';
import { ProductModule } from './products/product.module';

export const routes: Routes = [
  {
    path: '/products',
    module: ProductModule,
  },
];
