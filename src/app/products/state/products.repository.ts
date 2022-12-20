import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { joinRequestResult, withRequestsStatus } from '@ngneat/elf-requests';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsRepository {
  products$: Observable<any>;

  private store;

  constructor() {
    this.store = this.createStore();
    this.products$ = this.store.pipe(selectAllEntities(), joinRequestResult(['products']));
  }

  setProducts(products: Product[]) {
    this.store.update(setEntities(products));
  }

  private createStore(): typeof store {
    const store = createStore({ name: 'products' }, withEntities<Product>(), withRequestsStatus<'products'>());

    return store;
  }
}
