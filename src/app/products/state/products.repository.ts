import { Injectable } from '@angular/core';
import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { joinRequestResult, withRequestsStatus } from '@ngneat/elf-requests';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalPage: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsRepository {
  products$: Observable<any>;
  pagination$: Observable<Pagination>;

  private store;

  constructor() {
    this.store = this.createStore();
    this.products$ = this.store.pipe(selectAllEntities(), joinRequestResult(['products']));
    this.pagination$ = this.store.pipe(select(
      ({ itemsPerPage, currentPage, totalItems, totalPage }): any => {
        return { itemsPerPage, currentPage, totalItems, totalPage };
      })
    );
  }

  setProducts(products: Product[]) {
    this.store.update(setEntities(products));
  }

  setPagination(page: Pagination) {
    this.store.update(setProps(page));
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'products' },
      withEntities<Product>(),
      withRequestsStatus<'products'>(),
      withProps<Pagination>({ itemsPerPage: 0, currentPage: 0, totalItems: 0, totalPage: 0 })
    );

    return store;
  }
}
