import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../../utility/Constants/localStorageKeys';
import { useAppSelector } from '../../utility/Hooks/Redux/hooks';
import useActions from '../../utility/Hooks/Redux/useActions';
import useLocalStorage from '../../utility/Hooks/useLocalStorage';
import CartDrawer from '../Common/CartDrawer/CartDrawer';
import './Navbar.scss';
import routes from './navlinks';

const { Header } = Layout;

interface INavbar {
  children: React.ReactNode;
}
function Navbar({ children }: INavbar) {
  const pro = useAppSelector((state) => state.cart.allAddToCart);

  const ProductIds = pro.map(({ productId }) => productId);
  const filtered = pro.filter(
    ({ productId }, index) => !ProductIds.includes(productId, index + 1)
  );
  const { removeLocalStorage } = useLocalStorage();
  const authData = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const isbuyer = authData.role === 'buyer';
  const username =
    authData.firstName[0].toUpperCase() + authData.lastName[0].toUpperCase();

  const items = isbuyer ? routes.buyerRoutes : routes.sellerRoutes;
  const { clearAuthData, toggleCartDrawer } = useActions();
  const logout = () => {
    clearAuthData();
    removeLocalStorage(LOCAL_STORAGE_KEYS.AUTH);
  };

  const navigateUser = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <div>
      <Layout style={{ height: '100vh' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
          className='navbar-wrapper'
        >
          <img
            src='/icons/ecm.svg'
            alt='logo'
          />
          <Menu
            theme='dark'
            mode='horizontal'
            onClick={navigateUser}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
          <div className='rightside-navbar'>
            <Avatar
              style={{
                backgroundColor: 'orange',
                verticalAlign: 'middle',
              }}
              size='large'
            >
              {username}
            </Avatar>

            <Badge
              style={{ padding: '0px 5px' }}
              count={filtered.length}
            >
              <Avatar
                shape='square'
                icon={
                  <ShoppingCartOutlined
                    style={{ color: 'white', fontSize: '30px' }}
                    onClick={() => toggleCartDrawer()}
                  />
                }
              />
            </Badge>
            <CartDrawer />
            <Button
              type='primary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content
          style={{
            overflow: 'scroll',
          }}
        >
          {children}
        </Content>
      </Layout>
    </div>
  );
}

export default Navbar;
