import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { trackRequestResult } from '@ngneat/elf-requests';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ApiResponse } from 'src/app/shared/api-resp.model';
import { environment } from 'src/environments/environment';
import { Cart, CartProps, CartRepository } from '../state/cart.repository';

@Injectable({ providedIn: 'root' })
export class CartService {

    constructor(
        private cartRepository: CartRepository,
        private http: HttpClient,
        private toast: HotToastService,
        private auth: AuthService,
        private route: Router
    ) { }

    getState(): { cart$: Observable<any>, cartTotal$: Observable<CartProps> } {
        return { cart$: this.cartRepository.cart$, cartTotal$: this.cartRepository.cartTotal$ };
    }

    fetchCart() {
        this.http.get<Partial<ApiResponse>>(environment.apiUrlSpring + '/cart', { headers: { Authorization: this.auth.getToken() } })
            .pipe(
                tap((r) => {
                    if (r.success == false)
                        this.toast.error(r.error);
                    else
                        this.updateCartState(r.data);
                }),
                trackRequestResult(['cart'], { skipCache: true }),
                catchError(error => {
                    this.toast.error("Network error");
                    console.log('error: ', error);
                    return of(error);
                }),
            ).subscribe();
    }

    addQuantity(itemId: number, quantity: number) {
        // console.log("cart/add", itemId, quantity);
        //post and show success/error
        const data = {
            productId: itemId,
            quantity: quantity
        }
        this.http.post<Partial<ApiResponse>>(environment.apiUrlSpring + "/cart/add", data, { headers: { Authorization: this.auth.getToken() } })
            .pipe(
                // map(r => r.response as Partial<ApiResponse>),
                tap(resp => {
                    // console.log(resp);
                    if (resp.success) {
                        this.toast.success("Product added to cart successfully")
                        this.updateCartState(resp.data);
                    } else {
                        if (resp.error)
                            this.toast.error(resp.error);
                    }
                }),
                catchError(error => {
                    this.toast.info("Login required");
                    console.log('error: ', error);
                    return of(error);
                }),
            ).subscribe();
    }

    deleteCartItem(itemId: number) {
        // console.log("delete", itemId);
        this.http.delete<Partial<ApiResponse>>(environment.apiUrlSpring + "/cart?product_id=" + itemId, { headers: { Authorization: this.auth.getToken() } })
            .pipe(
                // map(r => r.response as Partial<ApiResponse>),
                tap(resp => {
                    // console.log(resp);
                    if (resp.success) {
                        this.toast.success("Product removed successfully")
                        this.updateCartState(resp.data);
                    } else {
                        if (resp.error)
                            this.toast.error(resp.error);
                    }
                }),
                catchError(error => {
                    this.toast.error("Network error");
                    console.log('error: ', error);
                    return of(error);
                }),
            ).subscribe();
    }

    decQuantity(cartId: number) {
        const cart: Cart = this.cartRepository.getCart(cartId);
        if (cart.quantity > 1) {
            const data = {
                productId: cart.productId,
                quantity: cart.quantity - 1
            }
            // console.log("update cart", data.productId, data.quantity);
            this.http.put<Partial<ApiResponse>>(environment.apiUrlSpring + "/cart", data, { headers: { Authorization: this.auth.getToken() } })
                .pipe(
                    // map(r => r.response as Partial<ApiResponse>),
                    tap(resp => {
                        // console.log(resp);
                        if (resp.success) {
                            this.toast.success("Product quantity updated successfully")
                            this.updateCartState(resp.data);
                        } else {
                            if (resp.error)
                                this.toast.error(resp.error);
                        }
                    }),
                    catchError(error => {
                        this.toast.error("Network error");
                        console.log('error: ', error);
                        return of(error);
                    }),
                ).subscribe();
        }
    }
    checkout() {
        if (!this.cartRepository.isEmpty())
            this.route.navigate(['/checkout'])
        else
            this.toast.info('Empty cart');
    }
    // TODO: these functions
    private updateCartState(data: any) {
        const entities: Cart[] = data.cartItemList.map((o: any) => ({
            id: o.id,
            productId: o.product.id,
            title: o.product.title,
            price: o.product.price,
            quantity: o.quantity,
            thumbnail: o.product.thumbnail
        }));
        this.cartRepository.setCart(entities);
        this.cartRepository.setCartTotal({ total: data.totalCartPrice, sub_total: data.totalPrice });
    }
}
