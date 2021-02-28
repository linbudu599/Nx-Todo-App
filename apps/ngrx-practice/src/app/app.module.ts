import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  CounterModule,
  reducer as counterReducer,
  COUNTER_FEATURE_KEY,
} from '@todoapp/counter';

import {
  BOOKS_FEATURE_KEY,
  booksReducer,
  COLLECTIONS_FEATURE_KEY,
  collectionsReducer,
} from '@todoapp/books';

import { BookListComponent } from './book-list/book-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';

@NgModule({
  declarations: [AppComponent, BookListComponent, BookCollectionComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    StoreModule.forRoot(
      {
        [COUNTER_FEATURE_KEY]: counterReducer,
        [BOOKS_FEATURE_KEY]: booksReducer,
        [COLLECTIONS_FEATURE_KEY]: collectionsReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    CounterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
