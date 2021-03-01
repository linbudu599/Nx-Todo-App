import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { from, Observable } from 'rxjs';

import {
  increment,
  decrement,
  reset,
  COUNTER_FEATURE_KEY,
} from '@todoapp/counter';

import { GoogleBooksService } from './book-list/book-list.service';

import {
  selectBookCollection,
  selectBooks,
  retrievedBookList,
  addBook,
  removeBook,
  BOOKS_FEATURE_KEY,
  BookCompState,
  Book,
  selectComputedBook,
  fetchBookEffect,
} from '@todoapp/books';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'NgRx Practice';

  count$: Observable<number>;
  books$ = this.store.pipe(select(selectBooks));
  computedBook$ = this.store.select(selectComputedBook, { extra: 'EXTRA' });
  bookCollection$ = this.store.pipe(select(selectBookCollection));

  constructor(
    private store: Store<{
      // should import from store
      counter: number;
      books: Book[];
      collections: string[];
    }>,
    private booksService: GoogleBooksService
  ) {
    this.count$ = store.select('counter');
  }

  ngOnInit() {
    // this.booksService
    //   .getBooks()
    //   .subscribe((books) => this.store.dispatch(retrievedBookList({ books })));
    this.store.dispatch(fetchBookEffect());
  }

  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
