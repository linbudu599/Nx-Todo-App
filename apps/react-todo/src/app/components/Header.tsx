import React from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';

import { CreateTodoDTO } from '@todoapp/dto';

const { Title } = Typography;

interface IHeader {
  mockCreateTodo: (createParams: CreateTodoDTO) => void;
  createTodo: () => void;
}

const LogoContainer = styled.div`
  width: 272px;
  height: 173px;
  background-color: #143055;
  padding: 5px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  width: 50%;
  height: 6%;
  margin-left: 25%;
  display: flex;
  padding: 0 3%;
  margin-bottom: 1%;
  justify-content: space-between;
  align-items: center;

  .fake-add {
    display: inline-block;
    border-radius: 5px;
    font-size: 16px;
    height: 100%;
  }

  .real-add {
    display: inline-block;
    border-radius: 5px;
    font-size: 16px;
    height: 100%;
  }
`;

const Header: React.FC<IHeader> = ({ mockCreateTodo, createTodo }) => {
  return (
    <>
      <LogoContainer>
        <img
          src="https://nx.dev/assets/images/nx-logo-white.svg"
          alt="nx-logo"
        />
      </LogoContainer>
      <Title className="title" style={{ textAlign: 'center' }}>
        Nx Todo-List (React)
      </Title>
      <ButtonContainer>
        <Button
          className="fake-add"
          type="primary"
          onClick={() => {
            mockCreateTodo({ title: 'xxx', description: 'xxx' });
          }}
        >
          Mock Add
        </Button>
        <Button
          className="real-add"
          type="primary"
          onClick={() => {
            createTodo();
          }}
        >
          Real Add
        </Button>
      </ButtonContainer>
    </>
  );
};

export default Header;
