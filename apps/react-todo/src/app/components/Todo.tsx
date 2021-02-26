import React, { useState } from 'react';
import { Empty } from 'antd';

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
import { TodoItem, MutationModal } from '@todoapp/ui-components-react';

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
          <TodoItem
            key={todo.id}
            todo={todo}
            fetchDetail={handleFetchDetail}
            deleteItem={handleDelete}
          />
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
