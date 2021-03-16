import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouter);

// then you can combine Router Selectors with Entity/Store Selectors like:

// const { selectEntities, selectAll } = carAdapter.getSelectors();

// export const selectCarEntities = createSelector(
//   carsFeatureSelector,
//   selectEntities
// );

// export const selectCar = createSelector(
//   selectCarEntities,
//   selectRouteParams,
//   (cars, { carId }) => cars[carId]
// );
