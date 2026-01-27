import { Drawer, Typography } from 'antd';
import { useAppSelector } from '../../../utility/Hooks/Redux/hooks';
import useActions from '../../../utility/Hooks/Redux/useActions';
import { CartDrawerContent } from './AddToCartData/CartDrawerContent';

const { Title } = Typography;
function CartDrawer() {
  const drawerState = useAppSelector((state) => state.uiState.cartDrawerState);

  const { toggleCartDrawer } = useActions();
  return (
    <Drawer
      title={
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Title
            level={5}
            style={{ marginBottom: '0' }}
          >
            My Cart
          </Title>
        </div>
      }
      placement='right'
      onClose={() => toggleCartDrawer()}
      open={drawerState}
    >
      <CartDrawerContent />
    </Drawer>
  );
}

export default CartDrawer;
