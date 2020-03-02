import React, { useContext, useEffect } from 'react';

import { Modal, Button, Input, Form } from 'antd';

import { UserContext } from 'contexts/user';
import { ModalsContext } from 'contexts/modals';

const { useForm } = Form;
const { TextArea } = Input;

const PostModal = () => {
  const {
    setModals,
    state: { post },
  } = useContext(ModalsContext);
  const setPostModal = setModals({ type: 'post' });

  const { createPost, editPost } = useContext(UserContext);

  const [form] = useForm();

  useEffect(() => {
    if (post.open) form.resetFields();
  }, [post.open, form]);

  const handleOk = async () => {
    const { body } = await form.validateFields();

    form.resetFields();

    if (post.isCreate) createPost(body);
    else editPost(post.postToEdit.id, body);

    setPostModal({ open: false, isCreate: true, postToEdit: null });
  };

  const handleCancel = () => {
    form.resetFields();
    setPostModal({ open: false, isCreate: true, postToEdit: null });
  };

  return (
    <Modal
      destroyOnClose
      confirmLoading
      onOk={handleOk}
      visible={post.open}
      onCancel={handleCancel}
      title={post.isCreate ? 'Compose a post.' : 'Edit your post'}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {post.isCreate ? 'Submit' : 'Edit'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          body: post.isCreate ? '' : post.postToEdit.attributes.body,
        }}
      >
        <Form.Item
          name="body"
          rules={[
            {
              required: true,
              message: 'Please do not leave your post blank!',
            },
            {
              max: 280,
              message: 'Your post should nod exceed 280 character limit!',
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostModal;
