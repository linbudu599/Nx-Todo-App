import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  reducer as counterReducer,
  COUNTER_FEATURE_KEY,
} from '@todoapp/counter';

import {
  BOOKS_FEATURE_KEY,
  booksReducer,
  COLLECTIONS_FEATURE_KEY,
  collectionsReducer,
  BooksEffects,
} from '@todoapp/books';

import { BookListComponent } from './book-list/book-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { CounterComponent } from './counter/counter.component';
import { CounterModule } from './counter/counter.module';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCollectionComponent,
    CounterComponent,
  ],
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
        metaReducers: !environment.production ? metaReducers : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([BooksEffects]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 30,
          logOnly: false,
        })
      : [],
    StoreRouterConnectingModule.forRoot(),
    CounterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
