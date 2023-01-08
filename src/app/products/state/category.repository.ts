import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, selectEntityByPredicate } from '@ngneat/elf-entities';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { joinRequestResult, withRequestsStatus } from '@ngneat/elf-requests';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryProps {
  selected: number;
}

@Injectable({ providedIn: 'root' })
export class CategoryRepository {
  category$: Observable<any>;
  selectedCatId$: Observable<number>;

  private store;

  constructor() {
    this.store = this.createStore();
    this.category$ = this.store.pipe(selectAllEntities(), joinRequestResult(['category']));
    this.selectedCatId$ = this.store.pipe(select((state) => state.selected));
  }

  setCategory(category: Category[]) {
    this.store.update(setEntities(category));
  }

  selectCategory(name: string) {
    this.store.pipe(
      selectEntityByPredicate((c) => c.name.toLowerCase() === name.toLowerCase()),
      tap((c) => {
        this.setProp(c ? c.id : 0);
      })
    ).subscribe();
    // var cat = this.store.query(getAllEntities()).find((c) => c.name.toLowerCase() === name.toLowerCase());
    // if (cat === undefined)
    //   this.setProp(0);
    // else
    //   this.setProp(cat.id);
  }

  setProp(selected: number) {
    this.store.update(setProps({ selected: selected }));
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'category' },
      withEntities<Category>(),
      withRequestsStatus<'category'>(),
      withProps<CategoryProps>({ selected: 0 })
    );

    return store;
  }
}
