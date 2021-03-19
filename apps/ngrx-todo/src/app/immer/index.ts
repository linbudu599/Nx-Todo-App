import {
  Action,
  ReducerTypes,
  ActionReducer,
  createReducer,
  ActionCreator,
  Creator,
} from '@ngrx/store';
import { produce } from 'immer';

export type ReducerHandler<State, Next> = (
  state: State,
  next: Next
) => State | void;

export type ObjectType = Record<string, unknown>;

export type OnsActor<State> = ReducerTypes<
  State,
  ActionCreator<string, Creator<unknown[], ObjectType>>[]
>[];

export function immerReducer<State, Next>(
  handler: ReducerHandler<State, Next>
) {
  return (state: State | undefined, next: Next) => {
    return produce(state, (draft: State) => handler(draft, next)) as State;
  };
}

export function createImmerReducer<State, A extends Action = Action>(
  initialState: State,
  ...ons: OnsActor<State>
): ActionReducer<State, A> {
  const reducer = createReducer(initialState, ...ons);
  return function reduce(state: State = initialState, action: A) {
    return immerReducer<State, A>(reducer)(state, action);
  };
}
