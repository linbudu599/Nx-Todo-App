import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import * as todoActions from './state/todo.action';
import { TodoModel } from './state/todo.model';
import { selectTodos, selectValidTodoOnly } from './state/todo.selector';
import { TodoItemBase } from '@todoapp/dto';
import {
  CreateTodoDTO,
  DeleteTodoDTO,
  UpdateTodoDTO,
  TaggedTodoItem,
} from '@todoapp/dto';
import { TodoFormComponent, SubmitEvt } from '@todoapp/ui-components';

import { AppService } from './app.service';

@Component({
  selector: 'todoapp-ngrx-store',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class TodoNgRxStoreComponent implements OnInit {
  todoState$: Observable<TodoItemBase[]> = this.store.pipe(select(selectTodos));

  lenForTest: number;

  title = 'ngrx-todo';

  @ViewChild(TodoFormComponent)
  private formComponent: TodoFormComponent;

  constructor(private store: Store, private readonly appService: AppService) {}

  initData() {
    this.appService.fetchAll().subscribe((todos) => {
      this.store.dispatch(todoActions.fetchTodosSuccess({ todos }));
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  handleRemove(deleteEvtParams: DeleteTodoDTO): void {
    this.appService.deleteOne(deleteEvtParams).subscribe(() => {
      this.initData();
    });
  }

  handleCheckDetail(itemId: number): void {
    this.appService.fetchById(itemId).subscribe((todo) => {
      this.formComponent.handleModelOpen(false, todo);
    });
  }

  handleFakeAdd(): void {
    this.createItem({
      title: '欧拉欧拉欧拉',
      description: '木大木大木大木大木大',
    });
  }

  handleRealAdd(): void {
    this.formComponent.handleModelOpen(true, { title: '', description: '' });
  }

  handleSubmit(evt: SubmitEvt) {
    evt.isCreate
      ? this.createItem(evt.payload)
      : this.updateItem(evt.payload as UpdateTodoDTO);
  }

  private createItem(createParams: CreateTodoDTO) {
    this.appService.createOne(createParams).subscribe(() => {
      this.initData();
    });
  }

  private updateItem(updateParams: UpdateTodoDTO) {
    this.appService.updateOne(updateParams).subscribe(() => {
      this.initData();
    });
  }
}
