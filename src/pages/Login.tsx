import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await login.mutateAsync(values);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('用户名或密码错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md card">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <Title level={3} className="text-white mb-1">
            芯片产业分析平台
          </Title>
          <Text className="text-gray-400">
            登录您的账户
          </Text>
        </div>

        {/* 登录表单 */}
        <Form
          name="login"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="用户名"
              className="bg-dark-300"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="密码"
              className="bg-dark-300"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <label className="text-gray-400">
                <input type="checkbox" className="mr-2" />
                记住我
              </label>
            </Form.Item>
            <a href="#" className="text-primary-500 hover:text-primary-400">
              忘记密码?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="h-12"
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <Divider>
          <span className="text-gray-500">或</span>
        </Divider>

        {/* 第三方登录 */}
        <div className="flex gap-4">
          <Button
            icon={<GithubOutlined />}
            className="flex-1 bg-dark-300 border-dark-100"
          >
            GitHub
          </Button>
          <Button
            icon={<GoogleOutlined />}
            className="flex-1 bg-dark-300 border-dark-100"
          >
            Google
          </Button>
        </div>

        {/* 注册链接 */}
        <div className="text-center mt-6">
          <Text className="text-gray-400">
            还没有账户?{' '}
            <a href="#" className="text-primary-500 hover:text-primary-400">
              立即注册
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
