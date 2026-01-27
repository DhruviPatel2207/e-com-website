import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import { Badge, Button, Card, Divider, Rate, Typography, theme } from 'antd';
import { useAppSelector } from '../../../utility/Hooks/Redux/hooks';
import useActions from '../../../utility/Hooks/Redux/useActions';
import './ShoppingCart.scss';

const { Title, Text } = Typography;

interface IState {
  onNext: () => void;
}
const ShoppingCart = ({ onNext }: IState) => {
  const { token } = theme.useToken();
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

  const { setCart, removeItemFromCartThunk } = useActions();

  return (
    <div>
      <Card style={{ maxWidth: '1260px', margin: 'auto' }}>
        {CartItemsData.map((data, index) => (
          <div key={index}>
            <div className='cart-items-container'>
              <img
                alt='example'
                src='./icons/watch.jpg'
                style={{
                  width: '126px',
                  height: 'auto',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className='items-data-container'>
                <Title level={4}>{data.product?.title}</Title>
                <Text>{data.product?.description}</Text>
                <Rate
                  allowHalf
                  disabled
                  style={{ color: token.colorPrimary }}
                  character={<StarFilled />}
                  defaultValue={data.product?.rating}
                />

                <div className='ticket-amount'>
                  <Button
                    type='dashed'
                    className='arrow-up'
                    icon={<PlusOutlined />}
                    onClick={() =>
                      setCart({
                        productId: data.productId,
                        userId: data.userId,
                      })
                    }
                  />
                  <Title
                    className='number'
                    style={{ marginBottom: 0 }}
                    level={5}
                  >
                    {data.count}
                  </Title>
                  <Button
                    className='arrow-down'
                    type='dashed'
                    icon={<MinusOutlined />}
                    onClick={() =>
                      removeItemFromCartThunk({
                        count: data.count,
                        id: data.id,
                      })
                    }
                  />
                </div>
              </div>
              <div className='total-of-product'>
                <Badge
                  count={<h5>{data.product?.discountPercentage}% off</h5>}
                  style={{
                    backgroundColor: 'red',
                    borderRadius: '20px',
                    padding: '8px',
                    width: 'fit-content',
                    color: 'white',
                  }}
                />
                <Text>Deal Of The Day: ${data.product?.discountedPrice}</Text>
                <Text
                  delete
                  type='danger'
                >
                  M.R.P : ${data.product?.price}
                </Text>
                <Divider style={{ margin: '15px 0px' }} />
                <Text strong> SubTotal: ${data.count * data.price}</Text>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </Card>
      <Card
        style={{
          maxWidth: '1260px',
          margin: 'auto',
          marginTop: '1rem',
        }}
      >
        <div className='confirm-total'>
          <Button
            onClick={() => onNext()}
            type='primary'
          >
            Confirm
          </Button>

          <Text strong> Total: ${finalTotal}</Text>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingCart;
