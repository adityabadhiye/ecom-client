import { createStore, withProps } from '@ngneat/elf';
import { joinRequestResult, withRequestsStatus } from '@ngneat/elf-requests';
import { Injectable } from '@angular/core';
import { setProps } from '@ngneat/elf';
import { Observable } from 'rxjs';
import { select } from '@ngneat/elf';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductDetailProps {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductDetailRepository {
  productDetail$: Observable<any>;

  private store;

  constructor() {
    this.store = this.createStore();
    this.productDetail$ = this.store.pipe(select((state) => state), joinRequestResult(['product-detail']));
  }

  setProduct(product: ProductDetailProps) {
    this.store.update(setProps(product));
  }

  private createStore(): typeof store {
    const store = createStore({ name: 'productDetail' }, withProps<ProductDetailProps>({}), withRequestsStatus<'product-detail'>());

    return store;
  }
}
