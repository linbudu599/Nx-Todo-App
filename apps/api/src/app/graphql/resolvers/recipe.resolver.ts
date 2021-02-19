import { Injectable, Scope } from '@nestjs/common';
import { Resolver, Query, Mutation, Arg, FieldResolver } from 'type-graphql';

import RecipeService from '../services/recipe.service';
import { Recipe, AddRecipeResult } from '../models/recipe';

@Injectable({ scope: Scope.REQUEST })
@Resolver()
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query((returns) => [Recipe])
  recipes() {
    return this.recipeService.getRecipes();
  }

  @Mutation((returns) => Recipe)
  addRecipe(@Arg('input') recipe: Recipe) {
    this.recipeService.addRecipe(recipe);
    return recipe;
  }
}

@Injectable()
@Resolver((of) => AddRecipeResult)
export class AddRecipeResultResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @FieldResolver()
  recipes() {
    return this.recipeService.getRecipes();
  }
}
