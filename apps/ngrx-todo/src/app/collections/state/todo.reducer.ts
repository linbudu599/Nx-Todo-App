import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  addTodoEntity,
  addTodosEntity,
  updateTodoEntity,
  updateTodosEntity,
} from './todo.action';
import { TodoItemBase } from '@todoapp/dto';

export interface TodoEntityState extends EntityState<TodoItemBase> {
  selectTodoId: number | null;
  success?: boolean;
  loading: boolean;
  reason?: string;
}

export const selectTodoId = (todo: TodoItemBase): number => todo.id;

export const sortByTodoTitle = (
  todoA: TodoItemBase,
  todoB: TodoItemBase
): number => todoA.title.localeCompare(todoB.title);

export const todoItemAdapter: EntityAdapter<TodoItemBase> = createEntityAdapter<TodoItemBase>(
  {
    selectId: selectTodoId,
    sortComparer: sortByTodoTitle,
  }
);

export const TODO_FEATURE_KEY = 'todo';

export const initialTodoEntityState: TodoEntityState = todoItemAdapter.getInitialState(
  {
    selectTodoId: null,
    success: false,
    loading: true,
  }
);

export const todoEntityReducer = createReducer(
  initialTodoEntityState,
  on(addTodoEntity, (state, { todo }) => todoItemAdapter.addOne(todo, state)),
  on(addTodosEntity, (state, { todos }) =>
    todoItemAdapter.addMany(todos, state)
  ),
  on(updateTodoEntity, (state, { updated }) =>
    todoItemAdapter.updateOne(updated, state)
  ),
  on(updateTodosEntity, (state, { updateds }) =>
    todoItemAdapter.updateMany(updateds, state)
  )
);
