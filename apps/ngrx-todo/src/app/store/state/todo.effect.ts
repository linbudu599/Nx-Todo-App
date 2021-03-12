import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { AppService } from '../app.service';

import * as todoActions from './todo.action';
import * as todoReducers from './todo.reducer';

@Injectable()
export class TodoEffect {
  constructor(private actions$: Actions, private appService: AppService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.fetchTodosEffect),
      // use service
      mergeMap(() =>
        this.appService.fetchAll().pipe(
          map((todos) => todoActions.fetchTodosSuccess({ todos })),
          catchError(() =>
            of(todoActions.fetchTodosFailed({ reason: 'Failed!' }))
          )
        )
      )

      // use fetch
    )
  );
}
