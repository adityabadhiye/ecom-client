import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { OrderDetailService } from 'src/app/order-detail/service/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderIdParam: string | null = null;
  orderDetail$ = this.orderDetailService.getOrderDetails();
  authState$ = this.auth.getAuthState();
  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.orderIdParam = this.route.snapshot.paramMap.get('orderId');
    if (this.orderIdParam)
      this.orderDetailService.fetchOrderDetail(this.orderIdParam);
    console.log(this.orderIdParam)
  }
}
