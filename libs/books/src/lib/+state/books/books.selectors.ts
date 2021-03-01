import {
  createSelector,
  createFeatureSelector,
  props,
  select,
} from '@ngrx/store';
import { BookCompState } from './books.state';
import { Book } from './books.models';
import { from, pipe } from 'rxjs';
import { every, filter, map } from 'rxjs/operators';

import * as fromBooks from './books.reducer';

export const selectBooks = createSelector(
  (state: BookCompState) => state.books,
  (books: Array<Book>) => books
);

// export declare function createFeatureSelector<T, V>(
//   featureName: keyof T
// ): MemoizedSelector<T, V>;

export const selectBooksStateEntity = createFeatureSelector<fromBooks.BookEntityState>(
  'books'
);

// 从整个store根部选择
export const selectCollectionState = createFeatureSelector<
  BookCompState,
  ReadonlyArray<string>
>('collections');

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  // 前面两个选择器的结果会分别作为参数
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);

interface IComputedBookProps {
  extra: string;
}
// 接收外部参数的selector
export const selectComputedBook = createSelector(
  selectBooks,
  (books: Array<Book>, props: IComputedBookProps): Array<Book> =>
    books.map((book) => ({
      id: `${props.extra}-${book.id}`,
      volumeInfo: book.volumeInfo,
    }))
);

export const selectComputedBookWithFilter = pipe(
  select(selectComputedBook),
  map((books) => from(books).pipe(filter((book) => !!book.id)))
);

// export const selectBookIds = createSelector(
//   selectBooksStateEntity,
//   fromBooks.selectBookIds
// );

// export const selectAllBook = createSelector(
//   selectBooksStateEntity,
//   fromBooks.selectAllBooks
// );
// export const selectUserTotal = createSelector(
//   selectBooksStateEntity,
//   fromBooks.selectTotalBooks
// );

// export const selectBookEntities = createSelector(
//   selectBooksStateEntity,
//   fromBooks.selectBookEntities
// );

// export const selectCurrentBookId = createSelector(
//   selectBooksStateEntity,
//   fromBooks.getSelectedBookId
// );

// export const selectCurrentBook = createSelector(
//   selectBooksStateEntity,
//   selectCurrentBookId,
//   (bookEntities, bookId) => bookEntities[bookId]
// );
