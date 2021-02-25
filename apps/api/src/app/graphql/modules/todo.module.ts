import { Module } from '@nestjs/common';

import { TodoResolver } from '../resolvers/todo.resolver';

import { LowdbProvider } from '../../db.provider';

@Module({
  providers: [TodoResolver, LowdbProvider],
})
export default class TodoModule {}
