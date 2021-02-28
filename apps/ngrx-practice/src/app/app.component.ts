import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

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
} from '@todoapp/books';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'NgRx Practice';

  count$: Observable<number>;
  books$ = this.store.pipe(select(selectBooks));
  bookCollection$ = this.store.pipe(select(selectBookCollection));

  constructor(
    private store: Store<any>,
    private booksService: GoogleBooksService
  ) {
    this.count$ = store.select('counter');
  }

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })));
  }

  onAdd(bookId) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId) {
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
