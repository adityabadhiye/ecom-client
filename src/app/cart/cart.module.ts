import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { CartRoutes } from './cart.routes';
import { AuthGuardService } from '../auth/service/auth-guard.service';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CartRoutes)
  ],
  providers: [
    AuthGuardService
  ]
})
export class CartModule { }
