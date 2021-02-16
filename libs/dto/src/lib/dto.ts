import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export interface TodoItemBase {
  id: number;
  title: string;
  description: string;
}

export type ImmutableTodoItem = Readonly<TodoItemBase>;

// 类型体操安排下
// export type CreateTodoItemPayload = Omit<TodoItemBase, "id">
export type CreateTodoItemPayload = {
  title: string;
  description?: string;
};

export type UpdateTodoItemPayload = {
  id: number;
  title?: string;
  description?: string;
};

export type DeleteTodoItemPayload = Pick<TodoItemBase, 'id'>;

export class CreateTodoDTO implements CreateTodoItemPayload {
  @IsString()
  @Length(2, 10)
  title: string;

  @IsString()
  @IsOptional()
  @Length(2, 20)
  description?: string;
}

export class UpdateTodoDTO implements UpdateTodoItemPayload {
  @IsInt()
  @Min(0)
  id: number;

  @IsString()
  @IsOptional()
  @Length(2, 10)
  title?: string;

  @IsString()
  @IsOptional()
  @Length(2, 20)
  description?: string;
}

export class DeleteTodoDTO implements DeleteTodoItemPayload {
  @IsInt()
  @Min(0)
  id: number;
}
