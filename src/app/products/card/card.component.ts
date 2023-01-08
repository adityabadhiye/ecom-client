import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/cart/service/cart.service';
import { ProductResponce } from 'src/app/shared/product-resp.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product!: ProductResponce;

  constructor(
    private cartService: CartService
  ) { }

  addToCart() {
    this.cartService.addQuantity(this.product.id, 1);
  }
}
