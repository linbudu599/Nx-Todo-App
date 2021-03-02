import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
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

import { RouterUseModule } from './router/router.module';

import { RouterComponent } from './router/router.component';

import { AppRoutingModule, routes } from './app-routing.module';
import { reducer } from './router/car/car.reducer';

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
    RouterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        cars: reducer,
        [COUNTER_FEATURE_KEY]: counterReducer,
        [BOOKS_FEATURE_KEY]: booksReducer,
        [COLLECTIONS_FEATURE_KEY]: collectionsReducer,
        router: routerReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
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
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    CounterModule,
    RouterUseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
