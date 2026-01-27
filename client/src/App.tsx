import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import CheckoutPage from './Component/CheckoutPage/CheckoutPage';
import HomePage from './Component/HomePage/HomePage';
import LoginPage from './Component/Login/LoginPage/LoginPage';
import Navbar from './Component/Navbar/Navbar';
import OrderDetailsPage from './Component/OrderDetails/OrderDetailsPage';
import OrderPage from './Component/OrderPage/OrderPage';
import ProductPage from './Component/ProductPage/ProductPage';
import WishListPage from './Component/WishListPage/WishListPage';
import { useAppSelector } from './utility/Hooks/Redux/hooks';

function App() {
  const authData = useAppSelector((state) => state.auth);

  if (!authData.id) {
    return <LoginPage />;
  }
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/wishlist'
            element={<WishListPage />}
          />
          <Route
            path='/checkout'
            element={<CheckoutPage />}
          />
          <Route
            path='/myorder'
            element={<OrderPage />}
          />

          <Route
            path='/orderDetailsPage/:id'
            element={<OrderDetailsPage />}
          />
          <Route
            path='/product/:id'
            element={<ProductPage />}
          />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
