import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { IAddress, IOrder } from '../../../types/types';
import API from '../../../utility/API';
import { ORDER_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { setOrderItems } from './orderSlice';

interface IData {
  items: {
    productId: number;
    discountedPrice: number;
    quantity: number;
    price: number;
    discountPercentage: number;
    total: number;
  }[];
  address: IAddress;
  finalTotal: number;
  userId: number;
}

export const createOrderAction =
  (orderData: IData): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      const { data } = await API.post<IOrder>(
        ORDER_ENDPOINTS.ADD_ORDER_DETAILS,
        orderData
      );
      dispatch(setOrderItems(data));
    } catch (error) {
      console.log(error);
    }
  };
