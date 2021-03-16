import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  routerReducer,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './router/app-routing.module';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { PopUpComponent, UiComponentsModule } from '@todoapp/ui-components';

import { TodoEffect } from './store/state/todo.effect';

import {
  TODO_FEATURE_KEY as STORE_TODO_FEATURE_KEY,
  reducer as storeTodoReducer,
} from './store/state/todo.reducer';

import {
  TODO_FEATURE_KEY as ENTITY_TODO_FEATURE_KEY,
  reducer as entityTodoReducer,
} from './collections/state/todo.reducer';

import { AppComponent } from './app.component';
import { TodoNgRxStoreComponent } from './store/app.component';
import { TodoNgRxEntityComponent } from './collections/app.component';

import { SharedModule } from '@todoapp/shared';

registerLocaleData(zh);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    if (action.type === ROUTER_NAVIGATION) {
      // ...
    }
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
    TodoNgRxEntityComponent,
    // TodoApp on @ngrx/data
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    UiComponentsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(
      {
        [STORE_TODO_FEATURE_KEY]: storeTodoReducer,
        [ENTITY_TODO_FEATURE_KEY]: entityTodoReducer,
        router: routerReducer,
      },
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([TodoEffect]),
    StoreRouterConnectingModule.forRoot(),
    NzButtonModule,
    NzLayoutModule,
    NzSpaceModule,
    NzTagModule,
    NzIconModule.forRoot(icons),
    NzFormModule,
    NzInputModule,
    NzToolTipModule,
    NzPipesModule,
    NzTypographyModule,
    NzPopconfirmModule,
    NzMessageModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
