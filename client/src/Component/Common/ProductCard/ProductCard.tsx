import { HeartFilled, HeartTwoTone, StarFilled } from '@ant-design/icons';
import { Button, Card, Rate, Typography, notification, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../utility/Hooks/Redux/hooks';
import useActions from '../../../utility/Hooks/Redux/useActions';
import './ProductCard.scss';

const { Title, Text, Paragraph } = Typography;

interface IState {
  title: string;
  description: string;
  rating: number;
  price: number;
  discountedPrice: number;
  category: string;
  id: number;
}

const ProductCard = ({
  title,
  description,
  rating,
  price,
  discountedPrice,
  category,
  id,
}: IState) => {
  const { token } = theme.useToken();

  const { id: userId } = useAppSelector((state) => state.auth);
  const wishlistData = useAppSelector((state) => state.wishList.allWishList);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { setWishListData, setCart, toggleCartDrawer } = useActions();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  const closeNotification = (type: string) => {
    setWishListData({
      type,
      productId: id,
      userId: userId,
    });
  };
  const onNotification = () => {
    navigate('/wishList');
  };
  const openNotification = () => {
    api.open({
      message: title,
      description: (
        <div>
          <p>{description}</p>
          <Text
            strong
            onClick={(e) => {
              e.stopPropagation();
              onNotification();
            }}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            View WishList
          </Text>
        </div>
      ),
      className: 'wishlistNotification',
      icon: (
        <img
          alt='example'
          src='./icons/watch.jpg'
          style={{ width: '15%', height: 'auto' }}
        />
      ),
      duration: 1,
    });
    closeNotification('add');
  };

  const onClickCart = () => {
    setCart({
      productId: id,
      userId: userId,
      price: discountedPrice,
    });
    toggleCartDrawer();
  };

  const isExiest = wishlistData.find(({ productId }) => productId === id);
  return (
    <Card
      className='product-card'
      onClick={handleCardClick}
      cover={
        <img
          alt='example'
          src='./icons/watch.jpg'
          style={{ width: '100%', height: 'auto' }}
        />
      }
    >
      <div className='product-card-data'>
        <div className='product-title-description'>
          <div className='product-title-rate'>
            <Title level={5}>{title}</Title>
            <Rate
              allowHalf
              disabled
              style={{ color: token.colorPrimary }}
              character={<StarFilled />}
              defaultValue={rating}
            />
          </div>
          <div className='price'>
            <Title level={5}>${discountedPrice}</Title>
            <Text
              delete
              type='danger'
            >
              ${price}
            </Text>
          </div>
        </div>
        <Paragraph className='para'>{description}</Paragraph>

        <div className='product-catagories-rate'>
          <Text disabled>{category}</Text>
        </div>
        <div className='product-cart-wishlist'>
          {contextHolder}
          {isExiest ? (
            <HeartFilled
              style={{ fontSize: '20px', color: '#eb2f96' }}
              onClick={(e) => {
                closeNotification('remove');
                e.stopPropagation();
              }}
            />
          ) : (
            <HeartTwoTone
              style={{ fontSize: '20px', color: 'red' }}
              twoToneColor='#eb2f96'
              onClick={(e) => {
                openNotification();
                e.stopPropagation();
              }}
            />
          )}
          <Button
            type='primary'
            block
            onClick={(e) => {
              e.stopPropagation();
              onClickCart();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default ProductCard;
