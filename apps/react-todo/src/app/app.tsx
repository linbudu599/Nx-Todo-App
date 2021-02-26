import React from 'react';

import { ApolloProvider } from '@apollo/client';

import createClient from './apollo/client';
import { StyledApp } from './styles';

import Todo from './components/Todo';

export function App() {
  return (
    <ApolloProvider client={createClient()}>
      <StyledApp>
        <Todo />
      </StyledApp>
    </ApolloProvider>
  );
}

export default App;
