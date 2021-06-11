import { Routes } from 'nest-router';
import { BrandModule } from './brands/brand.module';
import { ProductModule } from './products/product.module';
import { ShopModule } from './shops/shop.module';
import { CategoryModule } from './categories/category.module';
import { SupplierModule } from './suppliers/supplier.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { InventoryModule } from './inventory/inventory.module';
import { DiscountModule } from './discount/discount.module';
import { OfferModule } from './offer/offer.module';

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
  {
    path: '/supplier',
    module: SupplierModule,
  },
  {
    path: '/brand',
    module: BrandModule,
  },
  {
    path: '/wishlist',
    module: WishlistModule,
  },
  {
    path: '/inventory',
    module: InventoryModule,
  },
  {
    path: '/discount',
    module: DiscountModule,
  },
  {
    path: '/offer',
    module: OfferModule,
  },
];
