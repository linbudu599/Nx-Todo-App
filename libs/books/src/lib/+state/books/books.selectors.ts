import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookCompState } from './books.state';
import { Book } from './books.models';

export const selectBooks = createSelector(
  (state: BookCompState) => state.books,
  (books: Array<Book>) => books
);

export const selectCollectionState = createFeatureSelector<
  BookCompState,
  ReadonlyArray<string>
>('collections');

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);
