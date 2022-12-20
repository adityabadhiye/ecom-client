import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities } from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import { joinRequestResult, withRequestsStatus } from '@ngneat/elf-requests';
import { Injectable } from '@angular/core';

export interface Cart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CartProps {
  sub_total?: number;//total
  total?: number;//discountedTotal
}

@Injectable({ providedIn: 'root' })
export class CartRepository {
  cart$: Observable<any>;
  cartTotal$: Observable<CartProps>;

  private store;

  constructor() {
    this.store = this.createStore();
    this.cart$ = this.store.pipe(selectAllEntities(), joinRequestResult(['cart']));
    this.cartTotal$ = this.store.pipe(select((state) => { return { sub_total: state.sub_total, total: state.total } }));
  }

  setCart(cart: Cart[]) {
    this.store.update(setEntities(cart));
  }

  setCartTotal(cart: CartProps) {
    this.store.update(setProps(cart));
  }

  private createStore(): typeof store {
    const store = createStore({ name: 'cart' }, withProps<CartProps>({}), withEntities<Cart>(), withRequestsStatus<'cart'>());

    return store;
  }
}
