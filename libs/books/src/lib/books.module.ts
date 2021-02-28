import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromBooks from './+state/books/books.reducer';
import { BooksEffects } from './+state/books/books.effects';

import * as fromCollections from './+state/collections/collections.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBooks.BOOKS_FEATURE_KEY, fromBooks.booksReducer),
    EffectsModule.forFeature([BooksEffects]),
    StoreModule.forFeature(
      fromCollections.COLLECTIONS_FEATURE_KEY,
      fromCollections.collectionsReducer
    ),
    EffectsModule.forFeature([]),
  ],
})
export class BooksModule {}
