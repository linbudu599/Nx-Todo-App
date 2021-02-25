import { Module } from '@nestjs/common';

import { TypeGraphQLModule } from 'typegraphql-nestjs';

import GraphQLModule from './graphql/graphql.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LowdbProvider } from './db.provider';

@Module({
  imports: [
    GraphQLModule,
    TypeGraphQLModule.forRoot({
      emitSchemaFile: true,
      playground: true,
      authChecker: () => true,
      dateScalarMode: 'timestamp',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LowdbProvider],
})
export class AppModule {}
