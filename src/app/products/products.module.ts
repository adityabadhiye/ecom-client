import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { ProductsRoutes } from './products.routes';
import { CardComponent } from './card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from 'ngx-slider-v2';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductsRoutes),
    NgxPaginationModule,
    NgxSliderModule,
    FormsModule
  ]
})
export class ProductsModule { }
