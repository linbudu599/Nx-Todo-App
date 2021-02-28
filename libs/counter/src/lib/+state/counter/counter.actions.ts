import { createAction, props } from '@ngrx/store';
import { CounterEntity } from './counter.models';

export const init = createAction('[Counter Page] Init');

export const loadCounterSuccess = createAction(
  '[Counter/API] Load Counter Success',
  props<{ counter: CounterEntity[] }>()
);

export const loadCounterFailure = createAction(
  '[Counter/API] Load Counter Failure',
  props<{ error: any }>()
);
