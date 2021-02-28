import { createReducer, on, Action } from '@ngrx/store';

import { retrievedBookList } from './books.actions';
import { Book } from './books.models';

export const initialState: ReadonlyArray<Book> = [];

export const BOOKS_FEATURE_KEY = 'books';

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { Book }) => [...Book])
);
