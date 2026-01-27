import { useAppSelector } from '../../utility/Hooks/Redux/hooks';
import ProductList from '../Common/ProductList/ProductList';
import './WishListPage.scss';

function WishListPage() {
  const wishlistData = useAppSelector((state) => state.wishList.allWishList);
  const productdata = useAppSelector((state) => state.product.allProducts);
  const productIds = wishlistData.map((data) => data.productId);
  const productIdData = productdata.filter((product) =>
    productIds.includes(product.id)
  );

  return (
    <div className='wishlistPage-wrapper'>
      <ProductList productData={productIdData} />
    </div>
  );
}

export default WishListPage;
