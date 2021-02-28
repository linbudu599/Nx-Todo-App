import { createAction, props } from '@ngrx/store';
import { CollectionsEntity } from './collections.models';

export const init = createAction('[Collections Page] Init');

export const loadCollectionsSuccess = createAction(
  '[Collections/API] Load Collections Success',
  props<{ collections: CollectionsEntity[] }>()
);

export const loadCollectionsFailure = createAction(
  '[Collections/API] Load Collections Failure',
  props<{ error: any }>()
);
