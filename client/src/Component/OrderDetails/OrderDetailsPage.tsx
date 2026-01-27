import { Card, Divider, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../utility/Hooks/Redux/hooks';
import './OrderDetailsPage.scss';

const { Title, Text } = Typography;

const OrderDetailsPage = () => {
  const { id } = useParams();
  const allOrderData = useAppSelector((state) => state.order.allOrderItem);
  const productData = useAppSelector((state) => state.product.allProducts);

  const currantOrder = allOrderData.find(
    (data) => (id && data.id === +id) || undefined
  );

  const items = currantOrder?.items.flatMap((item) => {
    const product = productData.find((data) => data.id === item.productId);
    if (product) {
      return {
        product: product,
        price: item.price,
        count: item.quantity,
      };
    } else {
      return [];
    }
  });

  const orderDetails = {
    ...currantOrder,
    items: items || [],
  };

  return (
    <div className='order-detail-container'>
      <Card style={{ marginTop: '20px' }}>
        <Title level={4}>OrderId {id}</Title>
        <Divider />
        <div className='your-order-cards'>
          {orderDetails.items.map((data, i) => (
            <Link to={`/product/${data.product.id}`}>
              <div
                className='your-order-card'
                key={i}
              >
                <img
                  alt='example'
                  src='/icons/watch.jpg'
                />
                <div className='order-items-container'>
                  <Text strong>{data.product.title}</Text>
                  <Text type='secondary'>{data.product.description}</Text>
                  <Text strong>Quantity: {data.count}</Text>
                  <Text strong> Final Total : ${data.price * data.count}</Text>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
      <Card>
        <div className='final-total-container'>
          <Text strong> Final Total: </Text>
          <Text strong> ${orderDetails.finalTotal} </Text>
        </div>
      </Card>
      <Card>
        <Title level={4}>Address</Title>
        <Divider />

        <Text type='secondary'>{orderDetails.address?.streetAddress},</Text>
        <br />
        <Text type='secondary'>
          {orderDetails.address?.town} , {orderDetails.address?.postCode} ,
          {orderDetails.address?.country}
        </Text>
        <br />
        <Text type='secondary'> {orderDetails.address?.phone}</Text>

        <br />
        <br />
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
