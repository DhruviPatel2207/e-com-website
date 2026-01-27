import { Card } from 'antd';
import SellerProductList from '../SellerProductList/SellerProductList';
import './Seller.scss';

function Seller() {
  return (
    <div className='seller-container'>
      <Card className='card2'>
        <SellerProductList />
      </Card>
    </div>
  );
}

export default Seller;
