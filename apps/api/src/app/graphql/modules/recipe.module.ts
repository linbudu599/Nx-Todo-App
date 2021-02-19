import { Module } from '@nestjs/common';

import {
  RecipeResolver,
  AddRecipeResultResolver,
} from '../resolvers/recipe.resolver';

import RecipeService from '../services/recipe.service';

@Module({
  providers: [RecipeResolver, AddRecipeResultResolver, RecipeService],
})
export default class RecipeModule {}
