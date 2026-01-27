import { Steps } from 'antd';
import { useState } from 'react';
import { IAddress } from '../../types/types';
import CheckoutOrderStatus from './CheckoutOrderStatus/CheckoutOrderStatus';
import './CheckoutPage.scss';
import CheckoutStepTwoPage from './CheckoutStepTwo/CheckoutStepTwo';
import ShoppingCart from './ShoppingCart/ShoppingCart';

const CheckoutPage = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const [input, setInput] = useState<IAddress>({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    town: '',
    postCode: '',
    phone: '',
    email: '',
    notes: '',
  });

  const steps = [
    {
      title: 'SHOPPING CART',
      content: <ShoppingCart onNext={next} />,
    },
    {
      title: 'CHECKOUT',
      content: (
        <CheckoutStepTwoPage
          onNext={next}
          onPrevious={prev}
          setInput={setInput}
        />
      ),
    },
    {
      title: 'ORDER STATUS',
      content: (
        <CheckoutOrderStatus
          input={input}
          onPrevious={prev}
        />
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className='checkout-container'>
      <Steps
        current={current}
        items={items}
      />
      <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        {steps[current].content}
      </div>
    </div>
  );
};
export default CheckoutPage;
