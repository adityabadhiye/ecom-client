import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailRoutes } from './product-detail.routes';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductDetailRoutes)
  ]
})
export class ProductDetailModule { }
