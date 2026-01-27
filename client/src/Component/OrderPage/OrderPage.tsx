import { Button, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Link } from 'react-router-dom';
import { IAddress } from '../../types/types';
import { useAppSelector } from '../../utility/Hooks/Redux/hooks';

interface DataType {
  orderId: number;
  productName: string[];
  address: IAddress;
}
const { Text } = Typography;
const columns: ColumnsType<DataType> = [
  {
    title: 'order Id',
    dataIndex: 'orderId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
    render: (productName) => {
      return (
        <>
          {productName.map((name: string, i: number) => (
            <h5>
              {i + 1} . {name}
            </h5>
          ))}
        </>
      );
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (input) => {
      return (
        <>
          <Text>{input.streetAddress},</Text>
          <br />
          <Text>
            {input.town} , {input.postCode} , {input.country}
          </Text>
          <br />
          <Text> {input.phone}</Text>
          <br />
        </>
      );
    },
  },

  {
    title: 'Action',
    key: 'action',
    render: (_, { orderId }) => (
      <Space size='middle'>
        <Link to={{ pathname: `/orderDetailsPage/${orderId}` }}>
          <Button type='primary'>View</Button>
        </Link>
      </Space>
    ),
  },
];

const OrderPage: React.FC = () => {
  const orderList = useAppSelector((state) => state.order.allOrderItem);
  const productList = useAppSelector((state) => state.product.allProducts);

  const data = orderList.map((order) => {
    const selectedOrder = order.items.flatMap(({ productId }) => {
      const product = productList.find(({ id }) => id === productId);
      if (product) {
        return product.title;
      } else {
        return [];
      }
    });
    return {
      orderId: order.id,
      productName: selectedOrder,
      address: order.address,
    };
  });
  return (
    <Table
      columns={columns}
      dataSource={data}
      style={{ maxWidth: '1500px', margin: 'auto', marginTop: '30px' }}
    />
  );
};

export default OrderPage;
