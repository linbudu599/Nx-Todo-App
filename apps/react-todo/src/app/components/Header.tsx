import React from 'react';
import { Button } from 'antd';

import { CreateTodoDTO } from '@todoapp/dto';

interface IHeader {
  mockCreateTodo: (createParams: CreateTodoDTO) => void;
  createTodo: () => void;
}

const Header: React.FC<IHeader> = ({ mockCreateTodo, createTodo }) => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          mockCreateTodo({ title: 'xxx', description: 'xxx' });
        }}
      >
        Mock Add
      </Button>
      Nx Todo-List (React)
      <Button
        type="primary"
        onClick={() => {
          createTodo();
        }}
      >
        Real Add
      </Button>
    </>
  );
};

export default Header;
