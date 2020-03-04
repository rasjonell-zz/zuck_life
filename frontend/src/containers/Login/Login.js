import clsx from 'clsx';
import React, { useContext } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';

import { Row, Col, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { UserContext } from 'contexts/user';

const Login = ({ isSignUp }) => {
  const history = useHistory();

  const { state, logIn, signUp } = useContext(UserContext);

  const handleLogIn = async values => {
    if (isSignUp) await signUp(values);
    else await logIn(values);
    history.push('/');
  };

  if (state.user) return <Redirect to="/" />;

  return (
    <div>
      <Row>
        <Col md={16} sm={12} xs={0}>
          <div
            className={clsx('Profile-Background', {
              SignUp: isSignUp,
            })}
          />
        </Col>
        <Col md={8} sm={12} xs={24}>
          <div className="Profile-Form">
            <Form
              name="normal_login"
              className="login-form"
              onFinish={handleLogIn}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  placeholder="Username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {isSignUp ? 'Sign Up!' : 'Login'}
                </Button>
                {isSignUp ? (
                  <>
                    Already have an account? <Link to="/login">Log in!</Link>
                  </>
                ) : (
                  <>
                    Or <Link to="/join">Register now!</Link>
                  </>
                )}
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
