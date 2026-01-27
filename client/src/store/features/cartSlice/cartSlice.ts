import { createSlice } from '@reduxjs/toolkit';
import { ICart } from '../../../types/types';

interface ICartData {
  allAddToCart: ICart[];
}

const initialState: ICartData = {
  allAddToCart: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      const existingProduct = state.allAddToCart.find(
        (product) => product.productId === action.payload.productId
      );

      if (existingProduct) {
        existingProduct.count = action.payload.count;
      } else {
        state.allAddToCart.push(action.payload);
      }
    },
    removeCartItem: (state, action) => {
      state.allAddToCart = state.allAddToCart.filter(
        ({ id }) => id !== action.payload
      );
    },
    setFilterCart: (state, action) => {
      state.allAddToCart = action.payload;
    },
  },
});

export default cartSlice;
export const { setCart, setFilterCart, removeCartItem } = cartSlice.actions;
