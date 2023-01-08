import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { CheckoutRoutes } from './checkout.routes';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CheckoutRoutes),
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
