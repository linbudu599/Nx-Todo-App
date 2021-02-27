import {
  InMemoryCache,
  ApolloClient,
  ApolloCache,
  gql,
  createHttpLink,
} from '@apollo/client';

export interface IApolloClientContext {
  cache: ApolloCache<any>;
}

export default function createApolloClient() {
  const cache = new InMemoryCache({
    addTypename: true,
    resultCaching: true,
  });

  const link = createHttpLink({
    uri: 'http://localhost:3333/graphql',
  });

  const client = new ApolloClient({
    cache,
    link,
    headers: {
      'client-name': 'Nx-React-Todo [Client]',
      'client-version': '0.1.0',
    },
  });

  // cache.writeQuery({
  //   query: IS_LOGGED_IN,
  //   data: {
  //     // isLoggedIn: !!localStorage.getItem('token'),
  //     isLoggedIn: true,
  //   },
  // });

  return client;
}
