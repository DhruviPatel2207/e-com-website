import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { ICart } from '../../../types/types';
import API from '../../../utility/API';
import { CART_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { setCart } from './cartSlice';

interface IData {
  productId: number;
  userId: number;
  price?: number;
  count?: number;
  id?: number;
}
export const setCartThunk =
  (cartData: IData): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const { data: isExist } = await API.get<ICart[]>(
      CART_ENDPOINTS.GET_USERS_CART_ITEM(cartData.userId, cartData.productId)
    );
    if (isExist.length === 0) {
      API.post<IData>(CART_ENDPOINTS.ADD_USER_CART_ITEM, {
        ...cartData,
        count: 1,
      })
        .then(({ data }) => {
          console.log('added ===>', data);
          dispatch(setCart(data));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const currant = isExist[0];
      API.patch<ICart>(CART_ENDPOINTS.EDIT_CART_ITEM(currant.id), {
        ...cartData,
        count: currant.count + 1,
      })
        .then(({ data }) => {
          dispatch(setCart(data));
          console.log('patched ===>', data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };
