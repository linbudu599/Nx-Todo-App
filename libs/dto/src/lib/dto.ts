import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export enum TodoType {
  LIFE = 1,
  CODE,
  IDEA,
  REGRET,
  LOVE,
}

export interface TodoItemBase {
  id: number;
  title: string;
  description: string;
}

export interface TaggedTodoItem extends TodoItemBase {
  tag: string;
  tagText: string;
}

export type ImmutableTodoItem = Readonly<TodoItemBase>;

// 也可以类型体操安排下 但我懒得搞了
// XXXTodoPayload是不必要的 可以直接定义校验类
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
  @Length(2, 20)
  title: string;

  @IsString()
  @IsOptional()
  @Length(2, 30)
  description?: string;
}

export class UpdateTodoDTO implements UpdateTodoItemPayload {
  @IsInt()
  @Min(0)
  id: number;

  @IsString()
  @IsOptional()
  @Length(2, 20)
  title?: string;

  @IsString()
  @IsOptional()
  @Length(2, 30)
  description?: string;
}

export class DeleteTodoDTO implements DeleteTodoItemPayload {
  @IsInt()
  @Min(0)
  id: number;
}
