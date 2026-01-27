import { Button, Card, Checkbox, Form, Input, Typography } from 'antd';
import React, { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../../utility/Constants/localStorageKeys';
import useActions from '../../utility/Hooks/Redux/useActions';
import useLocalStorage from '../../utility/Hooks/useLocalStorage';
import { loginUser } from './Login.helper';
import './LoginPage.scss';

const { Title } = Typography;

interface ILogin {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IFormInitialValues {
  email: string;
  password: string;
  remember: boolean;
}
function Login({ setIsLogin }: ILogin) {
  const [form] = Form.useForm();
  const [isLoadig, setIsLoading] = React.useState(false);

  const { setAuthData } = useActions();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  useEffect(() => {
    const storageData = getLocalStorage(LOCAL_STORAGE_KEYS.AUTH);
    if (storageData) {
      setAuthData(storageData);
    }
  }, []);
  const onFinish = async ({
    email,
    password,
    remember,
  }: IFormInitialValues) => {
    setIsLoading(true);
    const response = await loginUser(email, password);
    if (response.error) {
      form.setFields(response.error);
    } else {
      setAuthData(response.data);
      if (remember) {
        setLocalStorage(LOCAL_STORAGE_KEYS.AUTH, response.data);
      }
    }
    setIsLoading(false);
  };

  const formInitialValues: IFormInitialValues = {
    email: '',
    password: '',
    remember: true,
  };

  return (
    <Card className='loginPage-container'>
      <Title level={2}>Login</Title>
      <Form
        onFinish={onFinish}
        form={form}
        initialValues={formInitialValues}
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: 'Email is required!' },
            {
              type: 'email',
              message: 'The input is not a valid email address',
            },
          ]}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            { required: true, message: 'Password is required!' },
            { min: 4, message: 'Password must be at least 4 characters' },
            {
              pattern:
                /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\|-])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*()_+{}\[\]:;<>,.?/~\\|-]{8,}$/,
              message: 'Password is invalid!',
            },
          ]}
        >
          <Input.Password type='text' />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
        >
          <Checkbox>Keep Signin me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={isLoadig}
          >
            Log in
          </Button>
        </Form.Item>
        <Title level={5}>
          Not a member yet?{' '}
          <Button
            type='link'
            onClick={() => setIsLogin(false)}
            style={{ padding: 0 }}
          >
            SignUp?
          </Button>
        </Title>
      </Form>
    </Card>
  );
}

export default Login;
