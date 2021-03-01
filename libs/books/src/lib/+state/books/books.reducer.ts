import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  retrievedBookList,
  addBookEntity,
  addBooksEntity,
  updateBookEntity,
  updateBooksEntity,
} from './books.actions';
import { Book } from './books.models';

export interface BookEntityState extends EntityState<Book> {
  selectedBookId: string | null;
  globalProp: boolean;
}

export const selectBookId = (book: Book): string => book.id;

export const sortByTitle = (bookA: Book, bookB: Book): number =>
  bookA.volumeInfo.title.localeCompare(bookB.volumeInfo.title);

// 提供对集合类型的各种操作
// 接收:
// selectId: 集合主键选择器
// sortComparer: 集合排序的依据

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: selectBookId,
  sortComparer: sortByTitle,
});

export const BOOKS_FEATURE_KEY = 'books';

export const initialEntityState: BookEntityState = booksAdapter.getInitialState(
  {
    selectedBookId: null,
    globalProp: false,
  }
);

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => [...books])
);

export const booksEntityReducer = createReducer(
  initialEntityState,
  on(addBookEntity, (state, { book }) => booksAdapter.addOne(book, state)),
  on(addBooksEntity, (state, { books }) => booksAdapter.addMany(books, state)),
  on(updateBookEntity, (state, { update }) =>
    booksAdapter.updateOne(update, state)
  ),
  on(updateBooksEntity, (state, { updates }) =>
    booksAdapter.updateMany(updates, state)
  )
);

export const getSelectedBookId = (state: BookEntityState) =>
  state.selectedBookId;

// 供selector使用 进一步简化选择器代码
export const {
  selectIds: selectBookIds,
  selectEntities: selectBookEntities,
  selectAll: selectAllBooks,
  selectTotal: selectTotalBooks,
} = booksAdapter.getSelectors();
