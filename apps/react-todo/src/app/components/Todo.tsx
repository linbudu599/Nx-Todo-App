import React, { useState } from 'react';
import { Empty, Button } from 'antd';
import styled from 'styled-components';

import {
  useFetchAllQuery,
  useUpdateMutationMutation as useUpdateMutation,
  DeleteMutationDocument,
  CreateMutationDocument,
  UpdateMutationDocument,
} from '@todoapp/graphql';

import { CreateTodoDTO, UpdateTodoDTO } from '@todoapp/dto';

import { useMutation } from '@apollo/client';

import Header from './Header';

import MutationModal from './MutationModal';

/**
 * @author linbudu599
 *
 * There are 3 ways to send a GraphQL request against server:
 * 1. useApolloClient
 * 2. useMutation(Document) (Document is from GraphQL-CodeGen generated)
 * 3. useXXXMutation (useXXXMutation is from GraphQL-CodeGen generated)
 * Just choose as you like :P
 */

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

const Todo: React.FC = () => {
  const { loading, error, data, refetch } = useFetchAllQuery();

  const [selectedTodoId, setSelectedTodoId] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [
    deleteTodo,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DeleteMutationDocument);

  const [
    createTodo,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CreateMutationDocument);

  const [
    updateTodo,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateMutation();

  const handleFetchDetail = (id: number) => {
    setSelectedTodoId(id);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleMockCreate = (createParams: CreateTodoDTO) => {
    createTodo({ variables: { createParams } });
    refetch();
  };

  const handleRealCreate = () => {
    setEditMode(false);
    setModalVisible(true);
  };

  const handleSubmitCreate = async (createParams: CreateTodoDTO) => {
    console.log('createParams: ', createParams);
    await createTodo({ variables: { createParams } });
    await refetch();

    setModalVisible(false);
  };

  const handleSubmitUpdate = async (updateParams: UpdateTodoDTO) => {
    console.log('updateParams: ', updateParams);
    await updateTodo({ variables: { updateParams } });
    await refetch();

    setModalVisible(false);
  };

  const handleDelete = (id: number) => {
    deleteTodo({ variables: { id } });
    refetch();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <>
      <Header mockCreateTodo={handleMockCreate} createTodo={handleRealCreate} />
      {data.todos.length ? (
        data.todos.map((todo) => (
          <TodoItemContainer key={todo.id}>
            <span className="todo-item-title">{todo.title} </span>
            <span className="todo-item-description">{todo.description}</span>
            <TodoItemOperationContainer>
              <Button
                size={'small'}
                className="todo-item-operation-edit"
                onClick={() => {
                  handleFetchDetail(todo.id);
                }}
              >
                编辑
              </Button>
              <Button
                className="todo-item-operation-remove"
                danger
                size={'small'}
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                删除
              </Button>
            </TodoItemOperationContainer>
          </TodoItemContainer>
        ))
      ) : (
        <Empty description={'看起来你还没有Todo事项, 恭喜~'} />
      )}
      <MutationModal
        visible={modalVisible}
        todoId={selectedTodoId}
        useEditMode={editMode}
        create={handleSubmitCreate}
        update={handleSubmitUpdate}
        close={handleCloseModal}
      />
    </>
  );
};

export default Todo;
