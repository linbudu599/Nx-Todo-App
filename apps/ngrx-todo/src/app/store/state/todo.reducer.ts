import { createReducer, on, Action } from '@ngrx/store';

import * as TodoActions from './todo.action';

import { TodoModel } from './todo.model';

export const TODO_FEATURE_KEY = 'todo';

export const initialState: TodoModel = {
  todos: [],
  loading: true,
};

// Todo: Immer

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
    const { id } = updated;
    const todos = [...state.todos];

    const idx = todos.findIndex((item) => item.id === id);

    todos[idx] = updated;

    return {
      ...state,
      todos,
    };
  }),
  on(TodoActions.fetchTodoDetail, (state, { todo }) => {
    const { id } = todo;
    const todos = [...state.todos];

    const idx = todos.findIndex((item) => item.id === id);

    todos[idx] = todo;

    return {
      ...state,
      todos,
    };
  }),
  on(TodoActions.createTodo, (state, { created }) => {
    let todos = state.todos;
    todos = [...todos, created];

    return {
      ...state,
      todos,
    };
  }),
  on(TodoActions.removeTodo, (state, { id }) => {
    let todos = state.todos;
    todos = state.todos.filter((todo) => todo.id !== id);

    return {
      ...state,
      todos,
    };
  })
);

export function reducer(state: TodoModel, action: Action) {
  return todoReducer(state, action);
}
