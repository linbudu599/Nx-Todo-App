import { createReducer, on, Action } from '@ngrx/store';
import produce from 'immer';

import * as TodoActions from './todo.action';

import { TodoModel } from './todo.model';

export const TODO_FEATURE_KEY = 'todo';

export const initialState: TodoModel = {
  todos: [],
  loading: true,
};

const todoReducer = createReducer(
  initialState,
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
  })),
  on(TodoActions.updateTodo, (state, { updated }) => {
    return produce(state, (draftState) => {
      const { id } = updated;
      draftState.todos.forEach((todo) => {
        if (todo.id === id) {
          todo = updated;
        }
      });
    });
  }),
  on(TodoActions.fetchTodoDetail, (state, { todo: detailedTodo }) => {
    return produce(state, (draftState) => {
      const { id } = detailedTodo;
      draftState.todos.forEach((todo) => {
        if (todo.id === id) {
          todo = detailedTodo;
        }
      });
    });
  }),
  on(TodoActions.createTodo, (state, { created }) => {
    return produce(state, (draftState) => {
      draftState.todos.push(created);
    });
  }),
  on(TodoActions.removeTodo, (state, { id }) => {
    return produce(state, (draftState) => {
      draftState.todos = draftState.todos.filter((todo) => todo.id !== id);
    });
  })
);

export function reducer(state: TodoModel, action: Action) {
  return todoReducer(state, action);
}
