import { Inject, Injectable, Scope } from '@nestjs/common';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';

import { Todo, CreateTodoInput, UpdateTodoInput } from '../models/todo';

import { DB_PROVIDER_TOKEN, DBType } from '../../constants';

@Injectable({ scope: Scope.REQUEST })
@Resolver()
export class TodoResolver {
  constructor(
    @Inject(DB_PROVIDER_TOKEN)
    private readonly db: DBType
  ) {}

  @Query(() => [Todo!])
  todos() {
    console.log('Query todo invoked');
    return this.db.get('todos').value();
  }

  @Query(() => Todo, { nullable: true })
  getTodoById(@Arg('id', () => Int) id: number) {
    console.log('Query getTodoById invoked');
    return this.db.get('todos').find({ id }).value() ?? null;
  }

  @Mutation(() => Todo)
  createOne(
    @Arg('createParams', () => CreateTodoInput) createParams: CreateTodoInput
  ) {
    console.log('Mutation createOne invoked');
    const id = (this.db.get('todos').last().value()?.id ?? 0) + 1;
    const create = {
      id,
      title: createParams.title,
      description: createParams.description ?? '',
    };
    this.db.get('todos').push(create).write();
    return create;
  }

  @Mutation(() => Todo)
  updateOne(
    @Arg('updateParams', () => UpdateTodoInput) updateParams: UpdateTodoInput
  ) {
    console.log('Mutation updateOne invoked');
    let origin = this.db.get('todos').find({ id: updateParams.id });
    const merged = origin.merge(updateParams);
    origin = merged;
    origin.write();
    return merged.value();
  }

  @Mutation(() => Todo)
  deleteOne(@Arg('id', () => Int) id: number) {
    console.log('Mutation deleteOne invoked');
    return this.db.get('todos').remove({ id }).write()[0];
  }
}
