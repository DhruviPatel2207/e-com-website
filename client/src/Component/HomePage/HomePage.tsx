import { useAppSelector } from '../../utility/Hooks/Redux/hooks';
import Buyer from './Buyer';
import Seller from './Seller';

function HomePage() {
  const authData = useAppSelector((state) => state.auth);
  const isbuyer = authData.role === 'buyer';

  return <div>{isbuyer ? <Buyer /> : <Seller />}</div>;
}

export default HomePage;
