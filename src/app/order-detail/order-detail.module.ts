import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule } from '@angular/router';
import { OrderDetailRoutes } from './order-detail.routes';



@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OrderDetailRoutes)
  ]
})
export class OrderDetailModule { }
