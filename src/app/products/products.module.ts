import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { ProductsRoutes } from './products.routes';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductsRoutes)
  ]
})
export class ProductsModule { }
