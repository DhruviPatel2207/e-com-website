import { Card, Typography } from 'antd';
import { useAppSelector } from '../../utility/Hooks/Redux/hooks';
import ProductFilter from '../Common/ProductFilter/ProductFilter';
import ProductList from '../Common/ProductList/ProductList';
import './Buyer.scss';

const { Text } = Typography;
function Buyer() {
  const { allProducts, filteredProducts } = useAppSelector(
    (state) => state.product
  );

  const productNumber = filteredProducts.length;
  return (
    <div className='buyer-homepage-container'>
      <Card className='card1'>
        <ProductFilter productData={allProducts} />
      </Card>
      <Card className='card2'>
        <Text
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          Product: {productNumber}
        </Text>
        <ProductList productData={filteredProducts} />
      </Card>
    </div>
  );
}

export default Buyer;
