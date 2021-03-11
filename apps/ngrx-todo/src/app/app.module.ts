import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';

import { TodoModule } from './store/state/todo.module';

import {
  TODO_FEATURE_KEY,
  reducer as todoReducer,
} from './store/state/todo.reducer';

import { AppComponent } from './app.component';
import { TodoNgRxStoreComponent } from './store/app.component';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
    // TodoApp on @ngrx/store
    TodoNgRxStoreComponent,
    // TodoApp on @ngrx/entity
    // TodoApp on @ngrx/data
  ],
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot(
      {
        [TODO_FEATURE_KEY]: todoReducer,
      },
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    TodoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
