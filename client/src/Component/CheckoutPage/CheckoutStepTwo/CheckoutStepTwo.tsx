import { Button, Card, Divider, Form, Input, Select, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { IAddress } from '../../../types/types';
import { useAppSelector } from '../../../utility/Hooks/Redux/hooks';
import './CheckoutStepTwo.scss';

const { Title, Text } = Typography;

interface IState {
  onNext: () => void;
  onPrevious: () => void;
  setInput: React.Dispatch<React.SetStateAction<IAddress>>;
}
const CheckoutStepTwoPage = ({ onNext, onPrevious, setInput }: IState) => {
  const allCartItem = useAppSelector((state) => state.cart.allAddToCart);
  const allProductItem = useAppSelector((state) => state.product.allProducts);
  const CartItemsData = allCartItem.map((cartItem) => {
    const selectetedProduct = allProductItem.find(
      (data) => data.id === cartItem.productId
    );
    return {
      ...cartItem,
      product: selectetedProduct,
    };
  });
  const finalTotal = allCartItem.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  const onFinish = (values: IAddress) => {
    setInput(values);
    onNext();
  };

  return (
    <div>
      <Card style={{ maxWidth: '1260px', margin: 'auto' }}>
        <Title level={4}> Billing Details </Title>
        <Divider />
        <Form onFinish={onFinish}>
          <div className='flex-container'>
            <Form.Item
              style={{ width: '50%' }}
              label='FirstName'
              name='firstName'
              rules={[{ required: true, message: 'FirstName is required' }]}
            >
              <Input type='text' />
            </Form.Item>
            <Form.Item
              style={{ width: '50%' }}
              label='LastName'
              name='lastName'
              rules={[{ required: true, message: 'lastName is required' }]}
            >
              <Input type='text' />
            </Form.Item>
          </div>
          <div className='flex-container'>
            <Form.Item
              label='Company Name'
              name='companyName'
              style={{ width: '50%' }}
            >
              <Input type='text' />
            </Form.Item>
            <Form.Item
              label='Country'
              name='country'
              style={{ width: '50%' }}
              rules={[
                {
                  required: true,
                  message: 'country is required',
                },
              ]}
            >
              <Select
                showSearch
                placeholder='Select a Country'
                optionFilterProp='children'
                options={[
                  {
                    value: 'INDIA',
                    label: 'India',
                  },
                  {
                    value: 'U.S',
                    label: 'U.S',
                  },
                ]}
              />
            </Form.Item>
          </div>
          <Form.Item
            label='Street Address'
            name='streetAddress'
            rules={[
              {
                required: true,
                message: 'street address is required',
              },
            ]}
          >
            <Input
              type='text'
              placeholder='House Number && Steet Name'
            />
          </Form.Item>
          <Form.Item
            label='Town/City'
            name='town'
            rules={[
              {
                required: true,
                message: 'town is required',
              },
            ]}
          >
            <Input type='text' />
          </Form.Item>
          <div className='flex-container'>
            <Form.Item
              label='PostCode'
              name='postCode'
              style={{ width: '50%' }}
              rules={[
                {
                  required: true,
                  message: 'postCode is required',
                },
              ]}
            >
              <Input type='text' />
            </Form.Item>
            <Form.Item
              label='Phone'
              name='phone'
              style={{ width: '50%' }}
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
              <Input type='text' />
            </Form.Item>
          </div>
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
            label='Order Notes'
            name='notes'
          >
            <TextArea rows={4} />
          </Form.Item>
          <div className='submit-confirm'>
            <Button
              htmlType='submit'
              style={{ width: 'fit-content' }}
              type='primary'
            >
              Confirm
            </Button>
            <Button
              onClick={() => onPrevious()}
              style={{ width: 'fit-content' }}
              type='primary'
            >
              Previous
            </Button>
          </div>
        </Form>
      </Card>
      <Card style={{ maxWidth: '1260px', margin: 'auto', marginTop: '1rem' }}>
        <Title level={4}>Your Order</Title>
        <Divider />
        {CartItemsData.map((data, i) => (
          <div key={i}>
            <div className='order-detail'>
              <Text strong>
                {data.product?.title} * {data.count}
              </Text>
              <Text>${data.count * data.price}</Text>
            </div>
          </div>
        ))}
        <Divider />
        <div className='total-name'>
          <Text strong>Total</Text>
          <Text strong> ${finalTotal}</Text>
        </div>
      </Card>
    </div>
  );
};

export default CheckoutStepTwoPage;
