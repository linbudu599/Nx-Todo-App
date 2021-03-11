import { createReducer, on, Action } from '@ngrx/store';

import * as TodoActions from './todo.action';

import { TodoModel } from './todo.model';

export const TODO_FEATURE_KEY = 'todo';

export const initialState: TodoModel = {
  todos: [],
  loading: true,
};

const todoReducer = createReducer(
  initialState,
  on(TodoActions.fetchTodos, (state, { todos }) => ({
    ...state,
    todos: [{ id: 0, title: '', description: '' }],
    success: true,
    loading: false,
  })),
  on(TodoActions.fetchTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    success: true,
    loading: false,
  })),
  on(TodoActions.fetchTodosFailed, (state, { reason }) => ({
    ...state,
    todos: [],
    success: false,
    loading: false,
    failedReason: reason,
  }))
);

export function reducer(state: TodoModel, action: Action) {
  return todoReducer(state, action);
}
