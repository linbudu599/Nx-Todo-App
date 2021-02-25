import React, { useState, useEffect, useCallback } from 'react';
import { FetchOneDocument, FetchOneQuery } from '@todoapp/graphql';

import { useApolloClient } from '@apollo/client';

import { Modal } from 'antd';

interface IMutationModal {
  visible: boolean;
  todoId: number;
}

type FetchOneClientQueryResult = {
  getTodoById: FetchOneQuery['getTodoById'] | null;
};

const MutationModal: React.FC<IMutationModal> = ({ visible, todoId }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(visible);

  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [todoDetail, setTodoDetail] = useState<FetchOneClientQueryResult>();

  const client = useApolloClient();

  const loadDetail = useCallback(async (id: number) => {
    if (!id) return;
    const { loading, error, data } = await client.query({
      query: FetchOneDocument,
      variables: { id },
    });

    console.log('data: ', data);

    setLoadingStatus(loading);
    setErrorStatus(!!error);
    setTodoDetail(data);
  }, []);

  useEffect(() => {
    setModalVisible(visible);
    loadDetail(todoId);
  }, [visible, todoId]);

  const handle = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={modalVisible}
      onOk={handle}
      onCancel={handle}
    >
      {loadingStatus ? (
        <p>Loading ...</p>
      ) : errorStatus ? (
        <p>Error!</p>
      ) : todoDetail?.getTodoById ? (
        <div>
          <p>title: {todoDetail?.getTodoById.title}</p>
          <p>description: {todoDetail?.getTodoById.description}</p>
        </div>
      ) : (
        <p>EMPTY</p>
      )}
    </Modal>
  );
};

export default MutationModal;
