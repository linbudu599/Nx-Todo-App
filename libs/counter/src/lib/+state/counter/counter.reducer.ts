import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CounterActions from './counter.actions';
import { CounterEntity } from './counter.models';

export const COUNTER_FEATURE_KEY = 'counter';

export interface State extends EntityState<CounterEntity> {
  selectedId?: string | number; // which Counter record has been selected
  loaded: boolean; // has the Counter list been loaded
  error?: string | null; // last known error (if any)
}

export interface CounterPartialState {
  readonly [COUNTER_FEATURE_KEY]: State;
}

export const counterAdapter: EntityAdapter<CounterEntity> = createEntityAdapter<CounterEntity>();

export const initialState: State = counterAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const counterReducer = createReducer(
  initialState,
  on(CounterActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CounterActions.loadCounterSuccess, (state, { counter }) =>
    counterAdapter.setAll(counter, { ...state, loaded: true })
  ),
  on(CounterActions.loadCounterFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return counterReducer(state, action);
}
