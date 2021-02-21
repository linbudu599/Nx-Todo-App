export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  recipes: Array<Recipe>;
};

export type Recipe = {
  __typename?: 'Recipe';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipe: Recipe;
};


export type MutationAddRecipeArgs = {
  input: RecipeInput;
};

export type RecipeInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

// The file generated on: 2021.02.21 15:02:36 pm-
