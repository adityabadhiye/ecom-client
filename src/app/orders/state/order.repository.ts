import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { joinRequestResult, withRequestsStatus } from '@ngneat/elf-requests';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class OrderRepository {
  order$: Observable<any>;

  private store;

  constructor() {
    this.store = this.createStore();
    this.order$ = this.store.pipe(selectAllEntities(), joinRequestResult(['order']));
    // this.order$.subscribe(console.log)
  }

  setOrder(order: Order[]) {
    this.store.update(setEntities(order));
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'order' },
      withEntities<Order>(),
      withRequestsStatus<'order'>()
    );
    return store;
  }
}
