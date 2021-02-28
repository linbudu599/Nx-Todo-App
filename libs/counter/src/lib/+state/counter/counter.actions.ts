import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter/API] Increment');

export const decrement = createAction('[Counter/API] Decrement');

export const reset = createAction('[Counter/API] Reset');
