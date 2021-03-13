import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CreateTodoDTO,
  DeleteTodoDTO,
  TodoItemBase,
  UpdateTodoDTO,
} from '@todoapp/dto';
import { TodoFormComponent, SubmitEvt } from '@todoapp/ui-components';

import { AppService } from './app.service';

import {
  addTodoEntity,
  addTodosEntity,
  updateTodoEntity,
  removeTodo,
} from './state/todo.action';
import { todoEntityReducer } from './state/todo.reducer';
import {
  selectTodoModel,
  selectTodos,
  getSelectedTodoId,
  selectTodoIds,
  selectTodoEntities,
  selectAllTodos,
  selectTotalTodos,
} from './state/todo.selector';

@Component({
  selector: 'todoapp-ngrx-entity',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class TodoNgRxEntityComponent implements OnInit {
  title = '@ngrx/entity todo';

  todos$: Observable<TodoItemBase[]> = this.store.pipe(select(selectTodos));

  @ViewChild(TodoFormComponent)
  private formComponent: TodoFormComponent;

  constructor(private store: Store, private appService: AppService) {}

  initialize() {
    this.appService.fetchAll().subscribe((todos) => {
      this.store.dispatch(addTodosEntity({ todos }));
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  handleRemove(deleteEvtParams: DeleteTodoDTO): void {
    this.appService.deleteOne(deleteEvtParams).subscribe(() => {
      this.store.dispatch(removeTodo({ id: deleteEvtParams.id }));
    });
  }

  handleCheckDetail(itemId: number): void {
    this.appService.fetchById(itemId).subscribe((todo) => {
      // this.store.dispatch(todoActions.fetchTodoDetail({ todo }));
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
    // this.appService.createOne(createParams).subscribe((created) => {
    //   this.store.dispatch(addTodoEntity({ todo:created }));
    //   // only for Tag attachment, state has already been updated
    //   this.initialize();
    // });
  }

  private updateItem(updateParams: UpdateTodoDTO) {
    // this.appService.updateOne(updateParams).subscribe((updated) => {
    //   this.store.dispatch(updateTodoEntity({ updated }));
    //   // only for Tag attachment, state has already been updated
    //   this.initialize();
    // });
  }
}
