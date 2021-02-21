import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo } from '../assets/logo.svg';
import { TodoItem } from '@todoapp/ui-components-react';

const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    background-color: #143055;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }

  main {
    padding: 0 36px;
  }

  h1 {
    text-align: center;
    margin-left: 18px;
    font-size: 24px;
  }
`;

export function App() {
  return (
    <StyledApp>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to react-todo!</h1>
      </header>
      <TodoItem />
    </StyledApp>
  );
}

export default App;
