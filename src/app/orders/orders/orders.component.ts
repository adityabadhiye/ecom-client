import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../service/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders$ = this.orderService.getOrders();

  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.orderService.fetchOrders();
  }
}
