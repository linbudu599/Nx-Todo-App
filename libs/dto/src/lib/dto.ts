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

export class CreateTodoDTO {
  @IsString()
  @Length(2, 20)
  title: string;

  @IsString()
  @IsOptional()
  @Length(2, 30)
  description?: string;
}

export class UpdateTodoDTO {
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

export class DeleteTodoDTO {
  @IsInt()
  @Min(0)
  id: number;
}
