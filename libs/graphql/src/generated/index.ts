/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  todos: Array<Todo>;
  getTodoById?: Maybe<Todo>;
};


export type QueryGetTodoByIdArgs = {
  id: Scalars['Int'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOne: Todo;
  updateOne: Todo;
  deleteOne: Todo;
};


export type MutationCreateOneArgs = {
  createParams: CreateTodoInput;
};


export type MutationUpdateOneArgs = {
  updateParams: UpdateTodoInput;
};


export type MutationDeleteOneArgs = {
  id: Scalars['Int'];
};

export type CreateTodoInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateTodoInput = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateMutationMutationVariables = Exact<{
  createParams: CreateTodoInput;
}>;


export type CreateMutationMutation = (
  { __typename?: 'Mutation' }
  & { createOne: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  ) }
);

export type UpdateMutationMutationVariables = Exact<{
  updateParams: UpdateTodoInput;
}>;


export type UpdateMutationMutation = (
  { __typename?: 'Mutation' }
  & { updateOne: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  ) }
);

export type DeleteMutationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMutationMutation = (
  { __typename?: 'Mutation' }
  & { deleteOne: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  ) }
);

export type FetchAllQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  )> }
);

export type FetchOneQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FetchOneQuery = (
  { __typename?: 'Query' }
  & { getTodoById?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  )> }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Todo: ResolverTypeWrapper<Todo>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: Scalars['Int'];
  Todo: Todo;
  String: Scalars['String'];
  Mutation: {};
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>;
  getTodoById?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<QueryGetTodoByIdArgs, 'id'>>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createOne?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationCreateOneArgs, 'createParams'>>;
  updateOne?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationUpdateOneArgs, 'updateParams'>>;
  deleteOne?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationDeleteOneArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


export const CreateMutationDocument = gql`
    mutation CreateMutation($createParams: CreateTodoInput!) {
  createOne(createParams: $createParams) {
    id
    title
    description
  }
}
    `;
export type CreateMutationMutationFn = Apollo.MutationFunction<CreateMutationMutation, CreateMutationMutationVariables>;

/**
 * __useCreateMutationMutation__
 *
 * To run a mutation, you first call `useCreateMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMutationMutation, { data, loading, error }] = useCreateMutationMutation({
 *   variables: {
 *      createParams: // value for 'createParams'
 *   },
 * });
 */
export function useCreateMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateMutationMutation, CreateMutationMutationVariables>) {
        return Apollo.useMutation<CreateMutationMutation, CreateMutationMutationVariables>(CreateMutationDocument, baseOptions);
      }
export type CreateMutationMutationHookResult = ReturnType<typeof useCreateMutationMutation>;
export type CreateMutationMutationResult = Apollo.MutationResult<CreateMutationMutation>;
export type CreateMutationMutationOptions = Apollo.BaseMutationOptions<CreateMutationMutation, CreateMutationMutationVariables>;
export const UpdateMutationDocument = gql`
    mutation UpdateMutation($updateParams: UpdateTodoInput!) {
  updateOne(updateParams: $updateParams) {
    id
    title
    description
  }
}
    `;
export type UpdateMutationMutationFn = Apollo.MutationFunction<UpdateMutationMutation, UpdateMutationMutationVariables>;

/**
 * __useUpdateMutationMutation__
 *
 * To run a mutation, you first call `useUpdateMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMutationMutation, { data, loading, error }] = useUpdateMutationMutation({
 *   variables: {
 *      updateParams: // value for 'updateParams'
 *   },
 * });
 */
export function useUpdateMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMutationMutation, UpdateMutationMutationVariables>) {
        return Apollo.useMutation<UpdateMutationMutation, UpdateMutationMutationVariables>(UpdateMutationDocument, baseOptions);
      }
export type UpdateMutationMutationHookResult = ReturnType<typeof useUpdateMutationMutation>;
export type UpdateMutationMutationResult = Apollo.MutationResult<UpdateMutationMutation>;
export type UpdateMutationMutationOptions = Apollo.BaseMutationOptions<UpdateMutationMutation, UpdateMutationMutationVariables>;
export const DeleteMutationDocument = gql`
    mutation DeleteMutation($id: Int!) {
  deleteOne(id: $id) {
    id
    title
    description
  }
}
    `;
export type DeleteMutationMutationFn = Apollo.MutationFunction<DeleteMutationMutation, DeleteMutationMutationVariables>;

/**
 * __useDeleteMutationMutation__
 *
 * To run a mutation, you first call `useDeleteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutationMutation, { data, loading, error }] = useDeleteMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMutationMutation, DeleteMutationMutationVariables>) {
        return Apollo.useMutation<DeleteMutationMutation, DeleteMutationMutationVariables>(DeleteMutationDocument, baseOptions);
      }
export type DeleteMutationMutationHookResult = ReturnType<typeof useDeleteMutationMutation>;
export type DeleteMutationMutationResult = Apollo.MutationResult<DeleteMutationMutation>;
export type DeleteMutationMutationOptions = Apollo.BaseMutationOptions<DeleteMutationMutation, DeleteMutationMutationVariables>;
export const FetchAllDocument = gql`
    query FetchAll {
  todos {
    id
    title
    description
  }
}
    `;

/**
 * __useFetchAllQuery__
 *
 * To run a query within a React component, call `useFetchAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllQuery, FetchAllQueryVariables>) {
        return Apollo.useQuery<FetchAllQuery, FetchAllQueryVariables>(FetchAllDocument, baseOptions);
      }
export function useFetchAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllQuery, FetchAllQueryVariables>) {
          return Apollo.useLazyQuery<FetchAllQuery, FetchAllQueryVariables>(FetchAllDocument, baseOptions);
        }
export type FetchAllQueryHookResult = ReturnType<typeof useFetchAllQuery>;
export type FetchAllLazyQueryHookResult = ReturnType<typeof useFetchAllLazyQuery>;
export type FetchAllQueryResult = Apollo.QueryResult<FetchAllQuery, FetchAllQueryVariables>;
export const FetchOneDocument = gql`
    query FetchOne($id: Int!) {
  getTodoById(id: $id) {
    id
    title
    description
  }
}
    `;

/**
 * __useFetchOneQuery__
 *
 * To run a query within a React component, call `useFetchOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchOneQuery(baseOptions: Apollo.QueryHookOptions<FetchOneQuery, FetchOneQueryVariables>) {
        return Apollo.useQuery<FetchOneQuery, FetchOneQueryVariables>(FetchOneDocument, baseOptions);
      }
export function useFetchOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchOneQuery, FetchOneQueryVariables>) {
          return Apollo.useLazyQuery<FetchOneQuery, FetchOneQueryVariables>(FetchOneDocument, baseOptions);
        }
export type FetchOneQueryHookResult = ReturnType<typeof useFetchOneQuery>;
export type FetchOneLazyQueryHookResult = ReturnType<typeof useFetchOneLazyQuery>;
export type FetchOneQueryResult = Apollo.QueryResult<FetchOneQuery, FetchOneQueryVariables>;
// The file generated on: 2021.02.25 12:02:01 pm-
