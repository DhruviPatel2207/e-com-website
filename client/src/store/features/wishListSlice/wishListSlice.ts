import { createSlice } from '@reduxjs/toolkit';
import { IWishlist } from '../../../types/types';

interface IWishlistData {
  allWishList: IWishlist[];
}

const initialState: IWishlistData = {
  allWishList: [],
};
const wishListSlice = createSlice({
  name: 'wishList',
  initialState: initialState,
  reducers: {
    setWishListData: (state, action) => {
      const isExiest = state.allWishList.find(
        ({ productId }) => productId === action.payload.productId
      );

      if (!isExiest) {
        state.allWishList.push(action.payload);
      } else {
        state.allWishList = state.allWishList.filter(
          ({ productId }) => productId !== action.payload.productId
        );
      }
    },

    setFilterWishList: (state, action) => {
      state.allWishList = action.payload;
    },
  },
});

export default wishListSlice;
export const { setWishListData, setFilterWishList } = wishListSlice.actions;
