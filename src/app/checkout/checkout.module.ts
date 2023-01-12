import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { CheckoutRoutes } from './checkout.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from '../auth/service/auth-guard.service';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CheckoutRoutes),
    ReactiveFormsModule
  ],
  providers: [AuthGuardService]
})
export class CheckoutModule { }
