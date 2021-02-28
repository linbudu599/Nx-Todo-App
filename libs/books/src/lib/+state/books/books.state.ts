import { Book } from './books.models';

export interface BookCompState {
  books: ReadonlyArray<Book>;
  collections: ReadonlyArray<string>;
}
