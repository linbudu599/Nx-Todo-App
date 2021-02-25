import React, { useState } from 'react';

import { useFetchAllQuery } from '@todoapp/graphql';

import MutationModal from './MutationModal';

const Todo: React.FC = () => {
  const { loading, error, data } = useFetchAllQuery();

  const [selectedTodoId, setSelectedTodoId] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleFetchDetail = (id: number) => {
    setSelectedTodoId(id);
    setModalVisible(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <>
      {data.todos.map((todo) => (
        <div key={todo.id}>
          <span>title: {todo.title} | &nbsp;</span>
          <span>description: {todo.description} | &nbsp;</span>
          <button
            onClick={() => {
              handleFetchDetail(todo.id);
            }}
          >
            detail
          </button>
          <button>delete</button>
        </div>
      ))}
      <MutationModal visible={modalVisible} todoId={selectedTodoId} />
    </>
  );
};

export default Todo;
