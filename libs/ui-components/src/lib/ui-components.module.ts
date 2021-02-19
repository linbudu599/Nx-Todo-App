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
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { PopUpService } from './pop-up/pop-up.service';

import { SharedModule } from '@todoapp/shared';
import { PopUpComponent } from './pop-up/pop-up.component';
import { DynamicCompHostComponent } from './dynamic-comp/dynamic-comp.component';

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
    NzDividerModule,
  ],
  providers: [PopUpService],
  declarations: [
    TodoItemComponent,
    TodoFormComponent,
    DynamicCompHostComponent,
  ],
  exports: [TodoItemComponent, TodoFormComponent, DynamicCompHostComponent],
  entryComponents: [PopUpComponent],
})
export class UiComponentsModule {}
