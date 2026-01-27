import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { ICart } from '../../../types/types';
import API from '../../../utility/API';
import { CART_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { removeCartItem, setCart } from './cartSlice';

interface IState {
  id: number;
  count: number;
}
export const removeItemFromCartThunk =
  ({ id, count }: IState): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    if (count === 1) {
      API.delete(CART_ENDPOINTS.DELETE_CART_ITEM(id)).then(() =>
        dispatch(removeCartItem(id))
      );
    } else {
      API.patch<ICart>(CART_ENDPOINTS.EDIT_CART_DEC_ITEM(id), {
        count: count - 1,
      })
        .then(({ data }) => {
          dispatch(setCart(data));
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };
