import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { GoogleBooksService } from './book-list/book-list.service';

import {
  selectBookCollection,
  selectBooks,
  addBook,
  removeBook,
  Book,
  selectComputedBook,
  fetchBookEffect,
} from '@todoapp/books';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'NgRx Practice';

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
  ) {}

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
}
