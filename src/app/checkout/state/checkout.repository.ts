import { createStore } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { createRequestsStatusOperator, selectRequestStatus, updateRequestStatus, withRequestsStatus } from '@ngneat/elf-requests';

@Injectable({ providedIn: 'root' })
export class CheckoutRepository {
  private store;

  public trackRequestsStatus;
  public checkoutStatus$;

  constructor() {
    this.store = this.createStore();
    this.trackRequestsStatus = createRequestsStatusOperator(this.store);
    this.checkoutStatus$ = this.store.pipe(selectRequestStatus('checkout'));
    this.checkoutStatus$.subscribe(console.log);
  }

  setError(error: any) {
    this.store.update(
      updateRequestStatus('checkout', 'error', error)
    );
  }

  private createStore(): typeof store {
    const store = createStore({ name: 'checkout' }, withRequestsStatus<'checkout'>());
    return store;
  }
}
