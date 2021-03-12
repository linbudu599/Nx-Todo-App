import { createSelector, createFeatureSelector, select } from '@ngrx/store';

import { from, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TODO_FEATURE_KEY } from './todo.reducer';
import { TodoModel } from './todo.model';

// GlobalState >>> TodoModel
export const selectTodoModel = createFeatureSelector<TodoModel>(
  TODO_FEATURE_KEY
);

// TodoModel >>> todos
export const selectTodos = createSelector(
  selectTodoModel,
  (state: TodoModel) => state.todos
);

// with props
export const selectTodoById = createSelector(
  selectTodoModel,
  (state: TodoModel, id: number) => state.todos.find((todo) => todo.id === id)
);

export const selectValidTodoOnly = pipe(
  select(selectTodos),
  map((todos) => from(todos).pipe(filter((todo) => !!todo.id)))
);

// selectTodoById.release()
