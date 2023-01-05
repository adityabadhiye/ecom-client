import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';
import { updateRequestStatus, withRequestsStatus, createRequestsStatusOperator, selectRequestStatus } from '@ngneat/elf-requests';

export interface AuthProps {
  token: string | null,
  full_name: string | null,
  email: string | null
}

@Injectable({ providedIn: 'root' })
export class AuthRepository {
  authState$: Observable<any>

  private store;
  private validationStore;
  private persist;

  public trackRequestsStatus;
  public loginStatus$;
  public signupStatus$;

  constructor() {
    this.store = this.createStore();
    this.validationStore = this.createValidationStore();
    this.persist = persistState(this.store, {
      key: 'auth',
      storage: localStorageStrategy,
    });
    this.authState$ = this.store.pipe(select(({ token, full_name, email }) => ({ token, full_name, email })));
    this.trackRequestsStatus = createRequestsStatusOperator(this.validationStore);
    this.loginStatus$ = this.validationStore.pipe(selectRequestStatus('login'));
    this.signupStatus$ = this.validationStore.pipe(selectRequestStatus('signup'));

    this.authState$.subscribe(console.log);
    this.loginStatus$.subscribe(console.log);
  }
  private createValidationStore(): typeof store {
    const store = createStore(
      { name: 'validation' },
      withRequestsStatus<'login'>(),
      withRequestsStatus<'signup'>()
    );
    return store;
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'auth' },
      withProps<AuthProps>({ token: null, full_name: null, email: null }),
    );
    return store;
  }

  setState(state: AuthProps, key: 'login' | 'signup') {
    this.store.update(
      setProps(state),
    );
    this.validationStore.update(
      updateRequestStatus(key, "success")
    )
  }

  setError(error: any, key: 'login' | 'signup') {
    this.validationStore.update(
      updateRequestStatus(key, 'error', error)
    );
  }

  getToken(): AuthProps['token'] {
    return this.store.query((state) => state.token);
  }

  reset() {
    this.store.reset();
    this.validationStore.reset();
  }
}
