import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { ISignupFormInitialValues } from '../../../types/types';
import useActions from '../../../utility/Hooks/Redux/useActions';
import './SignUp.scss';
import SignUpUser from './signUp.helper';

interface ISignup {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ setIsLogin }: ISignup) {
  const { Title } = Typography;

  const [form] = Form.useForm<ISignupFormInitialValues>();

  console.log('date ===>', dayjs());
  const { setAuthData } = useActions();
  const onFinish = async (values: ISignupFormInitialValues) => {
    const value = {
      ...values,
      birthDate: values.birthDate?.format('DD/MM/YYYY'),
    };

    const response = await SignUpUser(
      value as unknown as ISignupFormInitialValues
    );

    if (response && response.error) {
      form.setFields(response.error);
    } else if (response && response.data) {
      setAuthData(response.data);
      message.success('Sucessfully Register');
    }
  };

  const prefixSelector = (
    <Form.Item noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value='86'>+86</Select.Option>
        <Select.Option value='87'>+91</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Card className='signupPage-container'>
      <Title level={2}>SignUp</Title>
      <Form
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label='firstName'
          name='firstName'
          rules={[
            {
              required: true,
              message: 'Firstname is required!',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='lastName'
          name='lastName'
          rules={[
            {
              required: true,
              message: 'lastname is required!',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Username is required!',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Email is required',
            },
            {
              type: 'email',
              message: 'invalid email!',
            },
          ]}
        >
          <Input type='email' />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Password is required!',
            },
            {
              min: 4,
              message: 'Password must be atleast 4 characters',
            },
            {
              pattern:
                /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\|-])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*()_+{}\[\]:;<>,.?/~\\|-]{8,}$/,
              message: 'invalid password!',
            },
          ]}
        >
          <Input.Password type='text' />
        </Form.Item>
        <Form.Item
          label='Confirm password'
          name='confirm password'
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Confirm password is required!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password type='text' />
        </Form.Item>
        <Form.Item
          label='Age'
          name='age'
          rules={[
            {
              required: true,
              message: 'Age is required!',
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='phone'
          label='Phone Number'
          rules={[
            {
              required: true,
              message: 'PhoneNumber is required!',
            },
            {
              pattern: /\d+$/,
              message: 'invalid PhoneNumber!',
            },
            {
              min: 10,
              message: 'PhoneNumber must be 10 character!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name='role'
          label='Register as a '
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value='buyer'>Buyer</Select.Option>
            <Select.Option value='seller'>Seller</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='gender'
          label='Gender'
        >
          <Select>
            <Select.Option value='male'>Male</Select.Option>
            <Select.Option value='female'>Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label='BirthDate'
          name='birthDate'
        >
          <DatePicker
            picker='date'
            format='DD/MM/YYYY'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
          >
            SignUp
          </Button>
        </Form.Item>
      </Form>
      <Title level={5}>
        Already have an account{' '}
        <Button
          type='link'
          onClick={() => setIsLogin(true)}
          style={{ padding: 0 }}
        >
          Login?
        </Button>
      </Title>
    </Card>
  );
}

export default SignUp;
