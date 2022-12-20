import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { trackRequestResult } from '@ngneat/elf-requests';
import { map, tap } from 'rxjs/operators';
import { CartResponce } from 'src/app/shared/cart-resp.model';
import { environment } from 'src/environments/environment';
import { Cart, CartRepository } from '../state/cart.repository';

@Injectable({ providedIn: 'root' })
export class CartService {

    constructor(
        private cartRepository: CartRepository,
        private http: HttpClient
    ) { }

    fetchCart() {
        return this.http.get<CartResponce>(environment.apiUrl + '/carts/1').pipe(
            tap((r) => this.cartRepository.setCartTotal({ total: r.discountedTotal, sub_total: r.total })),
            map((responce: CartResponce) => {
                const entities: Cart[] = responce.products.map((o) => ({
                    id: o.id,
                    title: o.title,
                    price: o.price,
                    quantity: o.quantity,
                    thumbnail: "assets/img/cart/cart-1.jpg"
                }));
                return entities;
            }),
            tap((e) => this.cartRepository.setCart(e)),
            trackRequestResult(['cart'])
        ).subscribe();
    }

    // deleteCartItem(itemId)
    // updateCartItem(itemId, newQuantity)
    // ALSO REMOVE EMPTY CART UPON SUCCESSFULL ORDER
}
