import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  addTodoEntity,
  addTodosEntity,
  updateTodoEntity,
  updateTodosEntity,
  removeTodo,
} from './todo.action';
import { TodoItemBase } from '@todoapp/dto';

export interface TodoEntityState extends EntityState<TodoItemBase> {
  selectedTodoId: number | null;
  success?: boolean;
  loading: boolean;
  reason?: string;
}

export const selectTodoId = (todo: TodoItemBase): number => todo.id;

export const sortByTodoTitle = (
  todoA: TodoItemBase,
  todoB: TodoItemBase
): number => todoA.title.localeCompare(todoB.title);

export const todoAdapter: EntityAdapter<TodoItemBase> = createEntityAdapter<TodoItemBase>(
  {
    selectId: selectTodoId,
    sortComparer: sortByTodoTitle,
  }
);

export const TODO_FEATURE_KEY = 'entity_todo';

export const initialTodoEntityState: TodoEntityState = todoAdapter.getInitialState(
  {
    selectedTodoId: 1,
    success: false,
    loading: true,
  }
);

export const todoEntityReducer = createReducer(
  initialTodoEntityState,
  on(addTodoEntity, (state, { todo }) => todoAdapter.addOne(todo, state)),
  on(addTodosEntity, (state, { todos }) =>
    todoAdapter.addMany(todos, {
      ...state,
      success: true,
      loading: false,
    })
  ),
  on(updateTodoEntity, (state, { updated }) =>
    todoAdapter.updateOne(updated, state)
  ),
  on(updateTodosEntity, (state, { updateds }) =>
    todoAdapter.updateMany(updateds, state)
  ),
  on(removeTodo, (state, { id }) => todoAdapter.removeOne(id, state))
);

export function reducer(state: TodoEntityState | undefined, action: Action) {
  return todoEntityReducer(state, action);
}

export const selectTodoState = createSelector(
  (state: any) => state.todo as TodoItemBase[],
  (todos) => todos
);

export const selectTodoModel = createFeatureSelector<TodoEntityState>(
  TODO_FEATURE_KEY
);

export const getSelectedTodoId = (state: TodoEntityState): number =>
  state.selectedTodoId;

export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos,
  selectTotal: selectTotalTodos,
} = todoAdapter.getSelectors((state: any) => state[TODO_FEATURE_KEY]);

// 使用任意一种方式来从根状态树开始选择
// export const selectAllTodos = createSelector(selectTodoModel, selectAll);

// export const selectTodoIds = createSelector(selectTodoModel, selectIds);
