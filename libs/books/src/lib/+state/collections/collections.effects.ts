import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CollectionsFeature from './collections.reducer';
import * as CollectionsActions from './collections.actions';

@Injectable()
export class CollectionsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CollectionsActions.loadCollectionsSuccess({ collections: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CollectionsActions.loadCollectionsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
