import { Component, OnInit } from '@angular/core';
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
  }
}
