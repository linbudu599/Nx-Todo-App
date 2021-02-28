import { createReducer, on, Action } from '@ngrx/store';

import * as CounterActions from './counter.actions';

export const COUNTER_FEATURE_KEY = 'counter';

export const initialState = 0;

const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state) => state + 1),
  on(CounterActions.decrement, (state) => state - 1),
  on(CounterActions.reset, (state) => 0)
);

export function reducer(state: number, action: Action) {
  return counterReducer(state, action);
}
