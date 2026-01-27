import { Form, Input, Modal } from 'antd';

import { IProduct } from '../../../types/types';
import { useAppSelector } from '../../../utility/Hooks/Redux/hooks';
import useActions from '../../../utility/Hooks/Redux/useActions';
import './SellerProductModal.scss';

const SellerProductModal = () => {
  const isOpen = useAppSelector((state) => state.productModal.isOpen);
  const values = useAppSelector((state) => state.productModal.values);
  const authId = useAppSelector((state) => state.auth.id);
  const { openProductModal, closeProductModel, modalAction, addProductAction } =
    useActions();
  const [form] = Form.useForm();

  console.log('updated  ===>', form.getFieldsValue());
  const notification = async (type: 'edit' | 'add') => {
    openProductModal({
      type,
    });

    try {
      if (type === 'edit') {
        modalAction({
          id: values.id ? values.id : 0,
          values: form.getFieldsValue(),
        });
      } else if (type === 'add') {
        const updatedValues: IProduct = {
          ...form.getFieldsValue(),
          userId: authId,
        };
        addProductAction({
          values: updatedValues,
        });
      }
    } catch (error) {
      console.log('error ===>', error);
    }
  };

  const closeNotification = () => {
    closeProductModel();
    form.resetFields();
  };

  return (
    <Modal
      title='Basic Modal'
      open={isOpen}
      onOk={() => notification(values.id ? 'edit' : 'add')}
      onCancel={() => closeNotification()}
      okButtonProps={{
        htmlType: 'submit',
      }}
    >
      <Form
        initialValues={values}
        form={form}
        onFinish={(type) => notification(type)}
      >
        <Form.Item
          label='Title'
          name='title'
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
        >
          <Input type='text' />
        </Form.Item>
        <div className='input-container'>
          <Form.Item
            label='Price'
            name='price'
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            label='DiscountPercentage'
            name='discountPercentage'
          >
            <Input type='text' />
          </Form.Item>
        </div>
        <div className='input-container'>
          <Form.Item
            label='Rating'
            name='rating'
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            label='Stock'
            name='stock'
          >
            <Input type='text' />
          </Form.Item>
        </div>
        <Form.Item
          label='Brand'
          name='brand'
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='Category'
          name='category'
        >
          <Input type='text' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SellerProductModal;
