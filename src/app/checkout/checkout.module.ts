import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { CheckoutRoutes } from './checkout.routes';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CheckoutRoutes)
  ]
})
export class CheckoutModule { }
