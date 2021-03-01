import { createAction, props } from '@ngrx/store';
import { Book } from './books.models';

export const fetchBook = createAction('[Book List] Fetch Book');

export const fetchBookEffect = createAction('[Book List] Fetch Book Effect');

export const fetchBookEffectSuccess = createAction(
  '[Book List] Fetch Books Success',
  props<{ books: Book[] }>()
);

export const fetchBookEffectFailed = createAction(
  '[Book List] Fetch Books Failed'
);

export const addBook = createAction(
  '[Book List] Add Book',
  props<{ bookId: string }>()
);

export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId: string }>()
);

export const retrievedBookList = createAction(
  '[Book List/API] Retrieve Books Success',
  props<{ books: Book[] }>()
);
