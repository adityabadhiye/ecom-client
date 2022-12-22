import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent }
  // { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    AuthModule,
    ProductsModule,
    ProductDetailModule,
    CartModule,
    CheckoutModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
