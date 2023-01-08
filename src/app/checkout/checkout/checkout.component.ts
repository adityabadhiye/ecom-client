import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CartService } from 'src/app/cart/service/cart.service';
import { CheckoutService } from '../service/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  authState$ = this.auth.getAuthState();
  cartState = this.cartService.getState();
  checkoutStatus$: Observable<any> = this.checkoutService.getCheckoutStatus();

  checkoutForm = new FormGroup({
    address1: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    zip: new FormControl(''),
    phone: new FormControl(''),
    orderNotes: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) { }


  ngOnInit(): void {
    this.cartService.fetchCart();
  }

  submit() {
    this.checkoutService.checkout(this.checkoutForm.value);
  }
}
