import React, { useState, useEffect, useCallback } from 'react';
import { FetchOneDocument, FetchOneQuery } from '@todoapp/graphql';

import { useApolloClient } from '@apollo/client';

import { Modal } from 'antd';

interface IMutationModal {
  visible: boolean;
  todoId: number;
  useEditMode: boolean;
}

type FetchOneClientQueryResult = {
  getTodoById: FetchOneQuery['getTodoById'] | null;
};

const MutationModal: React.FC<IMutationModal> = ({
  visible,
  todoId,
  useEditMode,
}) => {
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

    setLoadingStatus(loading);
    setErrorStatus(!!error);
    setTodoDetail(data);
  }, []);

  useEffect(() => {
    setModalVisible(visible);
    useEditMode ? loadDetail(todoId) : void 0;
  }, [visible, todoId]);

  const handle = () => {
    setModalVisible(false);
  };

  const ContentAtEditMode = () => (
    <div>
      {loadingStatus ? (
        <p>Loading ...</p>
      ) : errorStatus ? (
        <p>Error!</p>
      ) : todoDetail?.getTodoById ? (
        <div>
          <p>title: {todoDetail?.getTodoById.title}</p>
          <p>description: {todoDetail?.getTodoById.description}</p>
        </div>
      ) : null}
    </div>
  );

  const ContentAtCreateMode = () => (
    <div>
      <p>Create</p>
    </div>
  );

  return (
    <Modal
      title={useEditMode ? `Update ${todoId}` : 'Create'}
      visible={modalVisible}
      onOk={handle}
      onCancel={handle}
    >
      {useEditMode ? ContentAtEditMode() : ContentAtCreateMode()}
    </Modal>
  );
};

export default MutationModal;
