import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import API from '../../../utility/API';
import { WISHLIST_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { setWishListData } from './wishListSlice';

interface IData {
  type?: string;
  productId: number;
  userId: number;
}
export const setWishListDataThunk =
  (wishListData: IData): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getStore) => {
    if (wishListData.type === 'add') {
      delete wishListData.type;
      API.post(WISHLIST_ENDPOINTS.ADD_USER_WISHLISTS, wishListData)
        .then(({ data }) => dispatch(setWishListData(data)))
        .catch((error) => {
          console.log(error);
        });
    } else {
      const store = getStore();
      const wishlist = store.wishList.allWishList;

      const objectData = wishlist.find(
        ({ productId }) => productId === wishListData.productId
      );

      if (objectData) {
        await API.delete(
          WISHLIST_ENDPOINTS.DELETE_USER_WISHLISTS(objectData.id)
        ).then(() => dispatch(setWishListData(wishListData)));
      }
    }
  };
