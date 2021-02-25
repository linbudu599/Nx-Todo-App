import React, { useState, useEffect, useCallback } from 'react';
import { FetchOneDocument, FetchOneQuery } from '@todoapp/graphql';

import { useApolloClient } from '@apollo/client';

import { Modal, Form, Input, Button } from 'antd';
import { CreateTodoDTO, UpdateTodoDTO } from '@todoapp/dto';

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
          <FormItem
            label="title"
            name="title"
            rules={[{ required: true, message: 'Todo Title Required!' }]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="description"
            name="description"
            rules={[{ required: true, message: 'Todo Description Required!' }]}
          >
            <Input />
          </FormItem>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
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
      <FormItem
        label="title"
        name="title"
        rules={[{ required: true, message: 'Todo Title Required!' }]}
      >
        <Input />
      </FormItem>

      <FormItem
        label="description"
        name="description"
        rules={[{ required: true, message: 'Todo Description Required!' }]}
      >
        <Input />
      </FormItem>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Modal
      title={useEditMode ? `Update ${todoId}` : 'Create'}
      visible={visible}
      onOk={close}
      onCancel={close}
    >
      {useEditMode ? ContentAtEditMode() : ContentAtCreateMode()}
    </Modal>
  );
};

export default MutationModal;
