import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Typography, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/types';
import { useAppSelector } from '../../utility/Hooks/Redux/hooks';
import useActions from '../../utility/Hooks/Redux/useActions';
import SellerProductModal from './AddProductModal/SellerProductModal';
import './SellerProductList.scss';

const { Title } = Typography;

const columns: ColumnsType<IProduct> = [
  {
    title: 'Product Name',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    render: (title) => <Title level={5}>{title}</Title>,
  },
  {
    title: 'Categories',
    dataIndex: 'category',
    key: 'category',
    render: (category) => <Title level={5}>{category}</Title>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => <Title level={5}>{price}</Title>,
  },
];

const SellerProductList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const products = useAppSelector((state) => state.product.allProducts);

  const authId = useAppSelector((state) => state.auth.id);
  const data = products.filter((product) => product.userId === authId);

  // @ts-ignore
  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { openProductModal, deleteProduct, deleteAllProduct } = useActions();

  const openEditModal = (record: IProduct) => {
    openProductModal({ type: 'edit', values: record });
  };
  const handleDeleteClick = () => {
    if (selectedRowKeys.length > 0) {
      deleteAllProduct(selectedRowKeys as number[]);
      setSelectedRowKeys([]);
    } else {
      message.warning('Please select rows to delete.');
    }
  };

  const cancel = () => {
    message.error('Click on No');
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className='add-more-icon'>
        <Button
          type='dashed'
          icon={<PlusOutlined />}
          onClick={() => openProductModal({ type: 'add' })}
        >
          Add More
        </Button>
        <SellerProductModal />

        <Popconfirm
          title='Delete the task'
          description='Are you sure to delete this task?'
          onCancel={cancel}
          okText='Yes'
          cancelText='No'
          onConfirm={handleDeleteClick}
        >
          <Button
            type='dashed'
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>

      <Table
        rowSelection={rowSelection}
        rowKey={(record) => record.id}
        columns={[
          ...columns,
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size='middle'>
                <Button
                  type='link'
                  onClick={() => navigate(`/product/${record.id}`)}
                >
                  View
                </Button>
                <Button
                  type='link'
                  onClick={() => openEditModal(record)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title='Delete the task'
                  description='Are you sure to delete this task?'
                  onConfirm={() => deleteProduct({ id: record.id })}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                  okButtonProps={{ danger: true }}
                >
                  <Button type='link'>Delete</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        dataSource={data}
      />
    </div>
  );
};

export default SellerProductList;
