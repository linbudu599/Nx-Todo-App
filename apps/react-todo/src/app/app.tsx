import React from 'react';

import { ReactComponent as Logo } from '../assets/logo.svg';
import { TodoItem } from '@todoapp/ui-components-react';

import { ApolloProvider } from '@apollo/client';

import createClient from './apollo/client';
import { StyledApp } from './styles';
import Content from './components/Content';
import Header from './components/Header';
import Todo from './components/Todo';

export function App() {
  return (
    <ApolloProvider client={createClient()}>
      <StyledApp>
        {/* <TodoItem /> */}
        {/* <Content /> */}
        <Header />
        <Todo />
      </StyledApp>
    </ApolloProvider>
  );
}

export default App;
