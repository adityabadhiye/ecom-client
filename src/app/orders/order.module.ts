import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderRoutes } from './order.routes';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OrderRoutes)
  ]
})
export class OrderModule { }
