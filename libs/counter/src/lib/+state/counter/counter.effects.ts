import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CounterFeature from './counter.reducer';
import * as CounterActions from './counter.actions';

@Injectable()
export class CounterEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CounterActions.loadCounterSuccess({ counter: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CounterActions.loadCounterFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
