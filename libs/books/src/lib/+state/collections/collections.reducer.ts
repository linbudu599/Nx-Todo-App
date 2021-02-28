import { createReducer, on } from '@ngrx/store';
import { addBook, removeBook } from '../books/books.actions';

export const initialCollectionState: ReadonlyArray<string> = [];

export const COLLECTIONS_FEATURE_KEY = 'collections';

export const collectionsReducer = createReducer(
  initialCollectionState,
  on(addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;
    return [...state, bookId];
  }),
  on(removeBook, (state, { bookId }) => state.filter((id) => id !== bookId))
);
