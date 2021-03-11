import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as todoActions from './state/todo.action';
import { TodoModel } from './state/todo.model';
import { selectTodos, selectValidTodoOnly } from './state/todo.selector';
import { TodoItemBase } from '@todoapp/dto';

@Component({
  selector: 'todoapp-ngrx-store',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class TodoNgRxStoreComponent implements OnInit {
  todoState$: Observable<TodoItemBase[]> = this.store.pipe(select(selectTodos));

  lenForTest: number;

  title = 'ngrx-todo';

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(
      todoActions.fetchTodosSuccess({
        todos: [{ id: 0, title: 'x', description: 'x' }],
      })
    );
  }
}
