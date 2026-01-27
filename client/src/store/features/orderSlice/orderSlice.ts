import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../../types/types';

interface IState {
  allOrderItem: IOrder[];
}

const initialState: IState = {
  allOrderItem: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setOrderItems: (state, action) => {
      state.allOrderItem.push(action.payload);
    },
    orderfilterWishlist: (state, action) => {
      state.allOrderItem = action.payload;
    },
  },
});

export default orderSlice;
export const { setOrderItems, orderfilterWishlist } = orderSlice.actions;
