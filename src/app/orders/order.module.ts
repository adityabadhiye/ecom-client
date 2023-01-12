import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/service/auth-guard.service';
import { OrderRoutes } from './order.routes';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OrderRoutes)
  ],
  providers: [AuthGuardService]
})
export class OrderModule { }
