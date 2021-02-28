import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as CounterActions from './counter.actions';
import * as CounterFeature from './counter.reducer';
import * as CounterSelectors from './counter.selectors';

@Injectable()
export class CounterFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CounterSelectors.getCounterLoaded));
  allCounter$ = this.store.pipe(select(CounterSelectors.getAllCounter));
  selectedCounter$ = this.store.pipe(select(CounterSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CounterActions.init());
  }
}
