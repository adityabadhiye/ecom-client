import { Component, OnInit } from '@angular/core';
import { jquery } from 'src/app/shared/jquery';
import { CartService } from '../service/cart.service';
import { CartRepository } from '../state/cart.repository';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$ = this.cartRepository.cart$;
  cartTotal$ = this.cartRepository.cartTotal$;

  constructor(
    private cartService: CartService,
    private cartRepository: CartRepository
  ) { }

  ngOnInit(): void {
    this.cart$.subscribe(console.log);
    this.cartService.fetchCart();
    setTimeout(jquery, 1000);
  }

  dec(cartId: number) {
    this.cartService.decQuantity(cartId);
  }
  inc(productId: number) {
    this.cartService.addQuantity(productId, 1);
  }
  delete(productId: number) {
    this.cartService.deleteCartItem(productId);
  }
  checkout() {
    this.cartService.checkout();
  }
}
