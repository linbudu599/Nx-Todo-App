import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

import { SharedModule } from '@todoapp/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,

    NzModalModule,
    NzPipesModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzTypographyModule,
    NzIconModule,
    NzTagModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
  ],
  declarations: [TodoItemComponent, TodoFormComponent],
  exports: [TodoItemComponent, TodoFormComponent],
})
export class UiComponentsModule {}
