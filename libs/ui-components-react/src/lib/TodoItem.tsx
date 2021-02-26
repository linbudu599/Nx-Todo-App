import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { FetchAllQuery } from '@todoapp/graphql';

type ExtractArrayMember<T> = T extends Array<infer R> ? R : never;

interface ITodoItem {
  todo: ExtractArrayMember<FetchAllQuery['todos']>;
  fetchDetail: (id: number) => void;
  deleteItem: (id: number) => void;
}

const TodoItemContainer = styled.div`
  width: 50%;
  height: 9%;
  border: 2px solid steelblue;
  border-radius: 5px;
  margin-left: 25%;
  margin-bottom: 1%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  line-height: 36px;

  .todo-item-title {
    font-size: 24px;
    width: 30%;
    display: inline-block;
    text-align: center;
    margin: 5px 0;
    border-right: 1px solid steelblue;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 10px;
  }

  .todo-item-description {
    font-size: 18px;
    width: 40%;
    display: inline-block;
    text-align: center;
    border-right: 1px solid steelblue;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 10px;
  }

  .todo-item-operation {
    width: 30%;
    display: inline-block;
    text-align: center;
    line-height: 36px;

    .todo-item-operation-edit {
      border-radius: 5px;
      font-size: 14px;
      margin-right: 15px;
    }

    .todo-item-operation-remove {
      border-radius: 5px;
      font-size: 14px;
      color: #e60000;
    }
  }
`;

const TodoItemOperationContainer = styled.div`
  width: 30%;
  display: inline-block;
  text-align: center;
  line-height: 36px;

  .todo-item-operation-edit {
    border-radius: 5px;
    font-size: 14px;
    margin-right: 15px;
  }

  .todo-item-operation-remove {
    border-radius: 5px;
    font-size: 14px;
    color: #e60000;
  }
`;

const TodoItem: React.FC<ITodoItem> = ({ todo, fetchDetail, deleteItem }) => {
  return (
    <TodoItemContainer>
      <span className="todo-item-title">{todo.title} </span>
      <span className="todo-item-description">{todo.description}</span>
      <TodoItemOperationContainer>
        <Button
          size={'small'}
          className="todo-item-operation-edit"
          onClick={() => {
            fetchDetail(todo.id);
          }}
        >
          编辑
        </Button>
        <Button
          className="todo-item-operation-remove"
          danger
          size={'small'}
          onClick={() => {
            deleteItem(todo.id);
          }}
        >
          删除
        </Button>
      </TodoItemOperationContainer>
    </TodoItemContainer>
  );
};

export default TodoItem;
