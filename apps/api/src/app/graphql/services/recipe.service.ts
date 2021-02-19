import { Injectable, Scope } from '@nestjs/common';
import { Recipe } from '../models/recipe';

@Injectable({ scope: Scope.REQUEST })
export default class RecipeService {
  private readonly recipes: Recipe[] = [{ title: 'xxx', description: 'xxx' }];

  async getRecipes() {
    return this.recipes;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
}
