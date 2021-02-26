import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Modal, Form, Input, Button } from 'antd';

import { FetchOneDocument, FetchOneQuery } from '@todoapp/graphql';
import { CreateTodoDTO, UpdateTodoDTO } from '@todoapp/dto';

import { useApolloClient } from '@apollo/client';

const { Item: FormItem, useForm } = Form;

interface IMutationModal {
  visible: boolean;
  todoId: number;
  useEditMode: boolean;
  create: (createParams: CreateTodoDTO) => void;
  update: (updateParams: UpdateTodoDTO) => void;
  close: () => void;
}

type FetchOneClientQueryResult = {
  getTodoById: FetchOneQuery['getTodoById'] | null;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const SubmitButtonContainer = styled(FormItem)`
  width: 20%;
  margin: 0 40%;
  button {
    border-radius: 5px;
  }
`;

const StyledLabelFormItem = styled(FormItem)`
  letter-spacing: 1px;
  label {
    font-size: 16px;
  }
`;

const MutationModal: React.FC<IMutationModal> = ({
  visible,
  todoId,
  useEditMode,
  create,
  update,
  close,
}) => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [todoDetail, setTodoDetail] = useState<FetchOneClientQueryResult>();

  const client = useApolloClient();
  const [editFormIns] = useForm();
  const [createFormIns] = useForm();

  const loadDetail = useCallback(async (id: number) => {
    if (!id) return;
    const { loading, error, data } = await client.query({
      query: FetchOneDocument,
      variables: { id },
    });

    setLoadingStatus(loading);
    setErrorStatus(!!error);
    setTodoDetail(data);

    editFormIns.setFieldsValue((data as FetchOneClientQueryResult).getTodoById);
  }, []);

  useEffect(() => {
    if (visible) {
      useEditMode
        ? loadDetail(todoId)
        : createFormIns.setFieldsValue({ title: '', description: '' });
    }
  }, [todoId, useEditMode, visible]);

  const updateCurrentItem = (v) => {
    update({ ...v, id: todoId });
  };

  const createCurrentItem = (v) => {
    create(v);
  };

  const ContentAtEditMode = () => (
    <div>
      {loadingStatus ? (
        <p>Loading ...</p>
      ) : errorStatus ? (
        <p>Error!</p>
      ) : todoDetail?.getTodoById ? (
        <Form
          {...layout}
          initialValues={todoDetail.getTodoById}
          form={editFormIns}
          onFinish={updateCurrentItem}
        >
          <StyledLabelFormItem
            label="title"
            name="title"
            rules={[{ required: true, message: 'Todo Title Required!' }]}
          >
            <Input />
          </StyledLabelFormItem>

          <StyledLabelFormItem
            label="description"
            name="description"
            rules={[{ required: true, message: 'Todo Description Required!' }]}
          >
            <Input />
          </StyledLabelFormItem>

          <SubmitButtonContainer>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </SubmitButtonContainer>
        </Form>
      ) : null}
    </div>
  );

  const ContentAtCreateMode = () => (
    <Form
      {...layout}
      form={createFormIns}
      initialValues={{}}
      onFinish={createCurrentItem}
    >
      <StyledLabelFormItem
        label="title"
        name="title"
        rules={[{ required: true, message: 'Todo Title Required!' }]}
      >
        <Input />
      </StyledLabelFormItem>

      <StyledLabelFormItem
        label="description"
        name="description"
        rules={[{ required: true, message: 'Todo Description Required!' }]}
      >
        <Input />
      </StyledLabelFormItem>

      <SubmitButtonContainer>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </SubmitButtonContainer>
    </Form>
  );

  return (
    <Modal
      title={useEditMode ? `Update Todo No.${todoId}` : 'Create Todo'}
      visible={visible}
      onCancel={close}
      footer={null}
    >
      {useEditMode ? ContentAtEditMode() : ContentAtCreateMode()}
    </Modal>
  );
};

export default MutationModal;
