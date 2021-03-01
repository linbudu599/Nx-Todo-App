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

export const selectBooks = createSelector(
  (state: BookCompState) => state.books,
  (books: Array<Book>) => books
);

// export declare function createFeatureSelector<T, V>(
//   featureName: keyof T
// ): MemoizedSelector<T, V>;

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
