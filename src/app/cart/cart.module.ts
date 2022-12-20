import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { CartRoutes } from './cart.routes';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CartRoutes)
  ]
})
export class CartModule { }
