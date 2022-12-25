import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type GetTodoInput = {
  todoId: Scalars['String'];
};

export type GetTodoResponse = {
  __typename?: 'GetTodoResponse';
  todo: Todo;
};

export type GetTodosResponse = {
  __typename?: 'GetTodosResponse';
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type MakeTodoInput = {
  title: Scalars['String'];
};

export type MakeTodoResponse = {
  __typename?: 'MakeTodoResponse';
  todo: Todo;
};

export type Mutation = {
  __typename?: 'Mutation';
  makeTodo: MakeTodoResponse;
  removeTodo: RemoveTodoResponse;
  updateTodo: UpdateTodoResponse;
};


export type MutationMakeTodoArgs = {
  makeTodoInput: MakeTodoInput;
};


export type MutationRemoveTodoArgs = {
  removeTodoInput: RemoveTodoInput;
};


export type MutationUpdateTodoArgs = {
  updateTodoInput: UpdateTodoInput;
};

export type Query = {
  __typename?: 'Query';
  getTodo: GetTodoResponse;
  getTodos?: Maybe<GetTodosResponse>;
  greet?: Maybe<Scalars['String']>;
};


export type QueryGetTodoArgs = {
  getTodoInput: GetTodoInput;
};

export type RemoveTodoInput = {
  todoId: Scalars['String'];
};

export type RemoveTodoResponse = {
  __typename?: 'RemoveTodoResponse';
  todo: Todo;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateTodoInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  todoId: Scalars['String'];
};

export type UpdateTodoResponse = {
  __typename?: 'UpdateTodoResponse';
  todo: Todo;
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { __typename?: 'Query', getTodos?: { __typename?: 'GetTodosResponse', todos?: Array<{ __typename?: 'Todo', id: string, title: string, isCompleted: boolean, createdAt: Date, updatedAt: Date } | null> | null } | null };


export const GetTodosDocument = gql`
    query GetTodos {
  getTodos {
    todos {
      id
      title
      isCompleted
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
      }
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;