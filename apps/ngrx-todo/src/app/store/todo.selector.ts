import {
  createSelector,
  createFeatureSelector,
  props,
  select,
} from '@ngrx/store';

import { from, pipe } from 'rxjs';
import { every, filter, map } from 'rxjs/operators';

import { TodoModel } from './todo.model';
import { TodoItemBase } from '@todoapp/dto';

import * as todoReducer from './todo.reducer';

export const selectTodoModel = createFeatureSelector<TodoModel>('todo');

export const selectTodos = createSelector(
  selectTodoModel,
  (state: TodoModel) => state.todos
);

export const selectValidTodoOnly = pipe(
  select(selectTodos),
  map((todos) => from(todos).pipe(filter((todo) => !!todo.id)))
);
