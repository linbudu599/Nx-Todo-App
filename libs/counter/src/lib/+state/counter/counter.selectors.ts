import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COUNTER_FEATURE_KEY,
  State,
  CounterPartialState,
  counterAdapter,
} from './counter.reducer';

// Lookup the 'Counter' feature state managed by NgRx
export const getCounterState = createFeatureSelector<
  CounterPartialState,
  State
>(COUNTER_FEATURE_KEY);

const { selectAll, selectEntities } = counterAdapter.getSelectors();

export const getCounterLoaded = createSelector(
  getCounterState,
  (state: State) => state.loaded
);

export const getCounterError = createSelector(
  getCounterState,
  (state: State) => state.error
);

export const getAllCounter = createSelector(getCounterState, (state: State) =>
  selectAll(state)
);

export const getCounterEntities = createSelector(
  getCounterState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCounterState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCounterEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
