import React, { useState } from 'react';

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

  const handleCreate = () => {
    setEditMode(false);
    setModalVisible(true);
  };

  const handleUpdate = (updateParams: UpdateTodoDTO) => {
    updateTodo({ variables: { updateParams } });
  };

  const handleDelete = (id: number) => {
    deleteTodo({ variables: { id } });
    refetch();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <>
      <Header mockCreateTodo={handleMockCreate} createTodo={handleCreate} />
      {data.todos.map((todo) => (
        <div key={todo.id}>
          <span>id: {todo.id} | &nbsp;</span>
          <span>title: {todo.title} | &nbsp;</span>
          <span>description: {todo.description} | &nbsp;</span>
          <button
            onClick={() => {
              handleFetchDetail(todo.id);
            }}
          >
            detail
          </button>
          <button
            onClick={() => {
              handleDelete(todo.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
      <MutationModal
        visible={modalVisible}
        todoId={selectedTodoId}
        useEditMode={editMode}
      />
    </>
  );
};

export default Todo;
