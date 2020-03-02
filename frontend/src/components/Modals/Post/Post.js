import React, { useContext } from 'react';

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

  const { createPost } = useContext(UserContext);

  const [form] = useForm();

  const handleOk = async () => {
    const { body } = await form.validateFields();

    form.resetFields();

    createPost(body);
    setPostModal({ open: false });
  };

  const handleCancel = () => {
    setPostModal({ open: false });
  };

  return (
    <Modal
      onOk={handleOk}
      visible={post.open}
      title="Compose a post."
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
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
