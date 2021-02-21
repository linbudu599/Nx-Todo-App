import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TodoItemProps {}

const StyledTodoItem = styled.div`
  color: pink;
`;

export function TodoItem(props: TodoItemProps) {
  return (
    <StyledTodoItem>
      <h1>Welcome to TodoItem!</h1>
    </StyledTodoItem>
  );
}

export default TodoItem;
