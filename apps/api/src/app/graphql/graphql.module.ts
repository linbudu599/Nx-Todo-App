import { Module } from '@nestjs/common';

import TodoModule from '../graphql/modules/todo.module';

@Module({
  imports: [TodoModule],
})
export default class GraphQLModule {}
