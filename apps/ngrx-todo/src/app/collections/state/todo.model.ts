import { TodoItemBase } from '@todoapp/dto';

export interface TodoModel {
  todos: TodoItemBase[];
  loading: boolean;
  success?: boolean;
  failedReason?: string;
}
