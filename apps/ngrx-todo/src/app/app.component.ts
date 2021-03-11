import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as todoActions from './store/todo.action';
import { TodoModel } from './store/todo.model';
import { selectTodos, selectValidTodoOnly } from './store/todo.selector';
import { TodoItemBase } from '@todoapp/dto';

@Component({
  selector: 'todoapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
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
