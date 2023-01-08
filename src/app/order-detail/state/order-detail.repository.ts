import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { joinRequestResult, withRequestsStatus } from '@ngneat/elf-requests';
import { Injectable } from '@angular/core';
import { OrderResponse } from 'src/app/shared/order-resp.model';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OrderDetailProps {
  orderDetail?: OrderResponse
}

@Injectable({ providedIn: 'root' })
export class OrderDetailRepository {
  private store;
  orderDetail$: Observable<any>;

  constructor() {
    this.store = this.createStore();
    this.orderDetail$ = this.store.pipe(select((state) => state.orderDetail), joinRequestResult(['order-detail']));
    this.orderDetail$.subscribe(console.log);
  }

  setOrderDetail(order: OrderResponse) {
    this.store.update(setProps({ orderDetail: order }));
  }

  private createStore(): typeof store {
    const store = createStore({ name: 'orderDetail' }, withProps<OrderDetailProps>({}), withRequestsStatus<'order-detail'>());
    return store;
  }
}
