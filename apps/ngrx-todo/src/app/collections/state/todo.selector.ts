import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoModel } from './todo.model';
import {
  TodoEntityState,
  todoItemAdapter,
  TODO_FEATURE_KEY,
} from './todo.reducer';

// GlobalState >>> TodoModel
export const selectTodoModel = createFeatureSelector<TodoModel>(
  TODO_FEATURE_KEY
);

// TodoModel >>> todos
export const selectTodos = createSelector(
  selectTodoModel,
  (state: TodoModel) => state.todos
);

export const getSelectedTodoId = (state: TodoEntityState): number =>
  state.selectTodoId;

export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos,
  selectTotal: selectTotalTodos,
} = todoItemAdapter.getSelectors();
