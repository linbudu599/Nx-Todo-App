import '@angular/compiler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { NzDividerModule } from 'ng-zorro-antd/divider';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

import { SharedModule } from '@todoapp/shared';
import {
  PopUpService,
  PopUpComponent,
  UiComponentsModule,
} from '@todoapp/ui-components';
import { AppComponent } from './app.component';

registerLocaleData(zh);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Monorepo App Module
    UiComponentsModule,
    SharedModule,
    // Ng-Zorro
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
    NzDividerModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent],
})
export class AppModule {}
