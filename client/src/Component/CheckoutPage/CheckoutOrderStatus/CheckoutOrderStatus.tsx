import { StarFilled } from '@ant-design/icons';
import { Button, Card, Divider, Rate, Typography, message, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IAddress } from '../../../types/types';
import { useAppSelector } from '../../../utility/Hooks/Redux/hooks';
import useActions from '../../../utility/Hooks/Redux/useActions';
import './CheckoutOrderStatus.scss';

const { Title, Text } = Typography;

interface IState {
  onPrevious: () => void;
  input: IAddress;
}

const CheckoutOrderStatus = ({ input, onPrevious }: IState) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { createOrder } = useActions();
  const userId = useAppSelector((state) => state.auth.id);
  const allCartItem = useAppSelector((state) => state.cart.allAddToCart);
  const allProductItem = useAppSelector((state) => state.product.allProducts);
  const CartItemsData = allCartItem.flatMap((cartItem) => {
    const selectetedProduct = allProductItem.find(
      (data) => data.id === cartItem.productId
    );

    if (selectetedProduct) {
      return {
        ...cartItem,
        product: selectetedProduct,
      };
    } else {
      return [];
    }
  });

  const finalTotal = allCartItem.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  const onClickPlaceOrder = () => {
    const itemArray = CartItemsData.map((data) => {
      return {
        productId: data.productId,
        discountedPrice: data.price,
        quantity: data.count,
        price: data.product.price,
        discountPercentage: data.product?.discountPercentage,
        total: data.count * data.price,
      };
    });

    const orderDetails = {
      items: itemArray,
      address: input,
      finalTotal: finalTotal,
      userId: userId,
    };

    try {
      createOrder(orderDetails);
      message.success('Order has been Placed');
      navigate('/myorder');
    } catch (error) {
      message.error("couldn't place your order");
      console.log('err ===>', error);
    }
  };
  return (
    <div>
      <Card style={{ maxWidth: '1260px', margin: 'auto' }}>
        <Title level={4}>Your Order</Title>
        <Divider />
        <div className='your-order-cards'>
          {CartItemsData.map((data, i) => (
            <div
              className='your-order-card'
              key={i}
            >
              <img
                alt='example'
                src='./icons/watch.jpg'
              />
              <div className='order-items-container'>
                <Text strong>{data.product.title}</Text>
                <Text type='secondary'>{data.product.description}</Text>
                <Rate
                  allowHalf
                  disabled
                  style={{ color: token.colorPrimary }}
                  character={<StarFilled />}
                  defaultValue={data.product.rating}
                />
                <Text strong> Quntity: {data.count}</Text>
                <Text strong>subTotal: ${data.price * data.count}</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ maxWidth: '1260px', margin: 'auto' }}>
        <div className='final-total-container'>
          <Text strong> Final Total: </Text>
          <Text strong> ${finalTotal} </Text>
        </div>
      </Card>
      <Card style={{ maxWidth: '1260px', margin: 'auto' }}>
        <Title level={4}>Address</Title>
        <Divider />
        <Text type='secondary'>{input.streetAddress},</Text>
        <br />
        <Text type='secondary'>
          {input.town} , {input.postCode} , {input.country}
        </Text>
        <br />
        <Text type='secondary'> {input.phone}</Text>
        <br />
        <br />
        <div className='btns'>
          <Button
            type='primary'
            onClick={onClickPlaceOrder}
          >
            Place Order
          </Button>
          <Button
            type='primary'
            onClick={onPrevious}
          >
            Edit Address
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CheckoutOrderStatus;
