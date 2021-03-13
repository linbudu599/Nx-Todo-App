import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';
import { TodoItemBase } from '@todoapp/dto';

export const fetchTodo = createAction('[Todo List] Fetch Todo');

export const fetchTodoEffect = createAction('[Todo List] Fetch Todo Effect');

export const fetchTodoEffectSuccess = createAction(
  '[Todo List] Fetch Todos Success',
  props<{ todos: TodoItemBase[] }>()
);

export const fetchTodoEffectFailed = createAction(
  '[Todo List] Fetch Todos Failed',
  props<{ reason?: string }>()
);

export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ id: number }>()
);

export const removeTodo = createAction(
  '[Todo Collection] Remove Todo',
  props<{ id: number }>()
);

export const retrievedTodoList = createAction(
  '[Todo List/API] Retrieve Todos Success',
  props<{ todos: TodoItemBase[] }>()
);

export const addTodoEntity = createAction(
  '[Todo Collection] Add Todo',
  props<{ todo: TodoItemBase }>()
);

export const addTodosEntity = createAction(
  '[Todo Collection] Add Todos',
  props<{ todos: TodoItemBase[] }>()
);

export const updateTodoEntity = createAction(
  '[Todo Collection] Update Todo',
  props<{ updated: Update<TodoItemBase> }>()
);

export const updateTodosEntity = createAction(
  '[Todo Collection] Update Todos',
  props<{ updateds: Update<TodoItemBase>[] }>()
);
