import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { IAuth, ICart, IProduct, IWishlist } from '../../../types/types';
import API from '../../../utility/API';
import {
  CART_ENDPOINTS,
  ORDER_ENDPOINTS,
  PRODUCTS_ENDPOINTS,
  WISHLIST_ENDPOINTS,
} from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { setFilterCart } from '../cartSlice/cartSlice';
import { orderfilterWishlist } from '../orderSlice/orderSlice';
import { setProductData } from '../productDataSlice/productDataSlice';
import { setFilterWishList } from '../wishListSlice/wishListSlice';
import { setAuthData } from './authSlice';

export const setAuthDataThunk =
  (authData: IAuth): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const { data } = await API.get<IProduct[]>(
      PRODUCTS_ENDPOINTS.GET_ALL_PRODUCTS
    );
    const wishlistdata = await API.get<IWishlist[]>(
      WISHLIST_ENDPOINTS.GET_USERS_WISHLISTS(authData.id)
    );
    const CartData = await API.get<ICart[]>(
      CART_ENDPOINTS.GET_USER_CART_LIST(authData.id)
    );

    const OrderData = await API.get(
      ORDER_ENDPOINTS.GET_ORDER_DETAILS(authData.id)
    );
    console.log('data ===>', data);
    const newData = data.map((elm) => {
      const discountedPrice = Math.round(
        elm.price - (elm.price * elm.discountPercentage) / 100
      );
      return {
        ...elm,
        discountedPrice,
      };
    });
    dispatch(setProductData(newData));
    dispatch(setFilterWishList(wishlistdata.data));
    dispatch(setFilterCart(CartData.data));
    dispatch(orderfilterWishlist(OrderData.data));
    dispatch(setAuthData(authData));
  };
