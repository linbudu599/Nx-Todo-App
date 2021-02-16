import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TodoItemComponent, TodoFormComponent],
  exports: [TodoItemComponent, TodoFormComponent],
})
export class UiComponentsModule {}
