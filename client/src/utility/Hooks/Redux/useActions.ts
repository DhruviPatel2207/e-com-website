import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setAuthDataThunk } from '../../../store/features/authSlice/authAction';
import { clearAuthData } from '../../../store/features/authSlice/authSlice';
import { setCartThunk } from '../../../store/features/cartSlice/cartAction';
import { removeItemFromCartThunk } from '../../../store/features/cartSlice/cartDecAction';
import { setFilterCart } from '../../../store/features/cartSlice/cartSlice';
import { createOrderAction } from '../../../store/features/orderSlice/orderAction';
import { orderfilterWishlist } from '../../../store/features/orderSlice/orderSlice';
import { addProductAction } from '../../../store/features/productDataSlice/addProductAction';
import { deleteAllProduct } from '../../../store/features/productDataSlice/deleteAllProducts';
import { deleteProduct } from '../../../store/features/productDataSlice/deleteProductAction';
import {
  clearList,
  setFilterData,
  setProductData,
} from '../../../store/features/productDataSlice/productDataSlice';
import { modalAction } from '../../../store/features/productDataSlice/productModalSliceAction';
import {
  closeProductModel,
  openProductModal,
} from '../../../store/features/productModalSlice/productModalSlice';
import { uiStateActions } from '../../../store/features/uiState/uiStateSlice';
import { setWishListDataThunk } from '../../../store/features/wishListSlice/wishListAction';
import { setFilterWishList } from '../../../store/features/wishListSlice/wishListSlice';

const actions = {
  setAuthData: setAuthDataThunk,
  clearAuthData,
  setProductData,
  setWishListData: setWishListDataThunk,
  setFilterWishList,
  ...uiStateActions,
  setFilterData,
  setCart: setCartThunk,
  setFilterCart,
  removeItemFromCartThunk,
  createOrder: createOrderAction,
  orderfilterWishlist,
  closeProductModel,
  modalAction,
  openProductModal,
  addProductAction,
  deleteProduct,
  clearList,
  deleteAllProduct,
};
const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
