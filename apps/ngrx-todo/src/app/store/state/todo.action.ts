import { createAction, props } from '@ngrx/store';

import {
  TodoItemBase,
  CreateTodoDTO,
  DeleteTodoDTO,
  UpdateTodoDTO,
  TaggedTodoItem,
} from '@todoapp/dto';

export const fetchTodosEffect = createAction(
  '[Todo List] Fetch Todo List Effect'
);

export const fetchTodosSuccess = createAction(
  '[Todo List] Fetch Todo List Success',
  props<{ todos: TodoItemBase[] }>()
);

export const fetchTodosFailed = createAction(
  '[Todo List] Fetch Todo List Failed',
  props<{ reason: string }>()
);

export const fetchTodoDetail = createAction(
  '[Todo List] Fetch Todo Detail',
  props<{ todo: TodoItemBase }>()
);

export const removeTodo = createAction(
  '[Todo List] Remove Todo',
  props<{ id: number }>()
);

export const updateTodo = createAction(
  '[Todo List] Update Todo',
  props<{ updated: TodoItemBase }>()
);

export const createTodo = createAction(
  '[Todo List] Create Todo',
  props<{ created: TodoItemBase }>()
);
