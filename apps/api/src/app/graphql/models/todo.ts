import { ObjectType, Field, ID, Int, InputType } from 'type-graphql';
import { CreateTodoDTO, TodoItemBase, UpdateTodoDTO } from '@todoapp/dto';

@ObjectType()
export class Todo implements TodoItemBase {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
export class CreateTodoInput extends CreateTodoDTO {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateTodoInput extends UpdateTodoDTO {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
