import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Affix, Button, Card, Divider, Empty, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ICart } from '../../../../types/types';
import { useAppSelector } from '../../../../utility/Hooks/Redux/hooks';
import useActions from '../../../../utility/Hooks/Redux/useActions';
import './CartDrawerContent.scss';

const { Text, Title } = Typography;
export const CartDrawerContent = () => {
  const cartData = useAppSelector((state) => state.cart.allAddToCart);
  const ProductData = useAppSelector((state) => state.product.allProducts);

  const AddtoCartData = cartData.map((cartItem) => {
    const selectetedProduct = ProductData.find(
      (data) => data.id === cartItem.productId
    );
    return {
      ...cartItem,
      product: selectetedProduct,
    };
  });

  const finalTotal = cartData.reduce((total: number, item: ICart) => {
    return total + item.count * item.price;
  }, 0);

  const { setCart, removeItemFromCartThunk, toggleCartDrawer } = useActions();

  return (
    <div>
      {cartData.length === 0 ? (
        <Empty />
      ) : (
        <AnimatePresence mode='popLayout'>
          <div className='addToCartData-wrapper'>
            {AddtoCartData.map((data) => (
              <motion.div
                key={data.id}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: 'spring',
                  delay: data.id * 0.1,
                  damping: 18,
                }}
              >
                <div className='img-cartData'>
                  <img
                    alt='example'
                    src='./icons/watch.jpg'
                  />
                  <div className='cart-data'>
                    <Title level={5}>{data.product?.title}</Title>
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
                    <Text type='secondary'>
                      Price: {data.product?.discountedPrice}
                    </Text>
                    <Text strong>Total Price: {data.price * data.count}</Text>
                  </div>
                </div>
                <Divider />
              </motion.div>
            ))}
            <Affix offsetBottom={0}>
              <Card>
                <div className='finalTotal-container'>
                  <Title level={5}>Total: {finalTotal}</Title>
                  <Link to='./checkout'>
                    <Button
                      type='primary'
                      onClick={() => toggleCartDrawer()}
                    >
                      CheckOut
                    </Button>
                  </Link>
                </div>
              </Card>
            </Affix>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};
