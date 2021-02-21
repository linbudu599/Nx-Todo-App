import React from 'react';

import { ReactComponent as Logo } from '../assets/logo.svg';
import { TodoItem } from '@todoapp/ui-components-react';

import { ApolloProvider } from '@apollo/client';

import createClient from './apollo/client';
import { StyledApp } from './styles';
import Content from './components/Content';

export function App() {
  return (
    <ApolloProvider client={createClient()}>
      <StyledApp>
        <header className="flex">
          <Logo width="75" height="75" />
          <h1>Welcome to react-todo!</h1>
        </header>
        <TodoItem />
        <Content />
      </StyledApp>
    </ApolloProvider>
  );
}

export default App;
