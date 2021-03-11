import { createAction, props } from '@ngrx/store';

import { TodoItemBase } from '@todoapp/dto';

export const fetchTodos = createAction(
  '[Todo List] Fetch Todo List',
  props<{ todos: TodoItemBase[] }>()
);

export const fetchTodosSuccess = createAction(
  '[Todo List] Fetch Todo List Success',
  props<{ todos: TodoItemBase[] }>()
);

export const fetchTodosFailed = createAction(
  '[Todo List] Fetch Todo List Failed',
  props<{ reason: string }>()
);
