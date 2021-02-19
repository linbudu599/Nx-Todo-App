import { Module } from '@nestjs/common';


import RecipeModule from '../graphql/modules/recipe.module';

@Module({
  imports: [RecipeModule],
  providers: [],
})
export default class GraphQLModule {}
