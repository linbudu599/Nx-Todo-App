import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as BooksFeature from './books.reducer';
import * as BooksActions from './books.actions';

import { GoogleBooksEffectService } from './books.service';

// 触发effect -> 完成后dispatch一个action -> 由reducer派生新状态

@Injectable()
export class BooksEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      // 接收一个或多个action type作为参数, 来确认会基于哪个action做出什么样反馈
      // 监听所有actions 但只会在这里传入的action发生时触发
      ofType(BooksActions.fetchBookEffect),
      mergeMap(() =>
        this.bookService.getBooks().pipe(
          map((books) => {
            console.log('books: ', books);
            return BooksActions.retrievedBookList({ books });
          }),
          catchError(() => EMPTY)
        )
      )
      // fetch({
      //   run: (action) => {
      //     // return BooksActions.loadBooksSuccess({ books: [] });
      //   },

      //   onError: (action, error) => {
      //     console.error('Error', error);
      //     // return BooksActions.loadBooksFailure({ error });
      //   },
      // })
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: GoogleBooksEffectService
  ) {}
}
