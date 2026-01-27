import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import API from '../../../utility/API';
import { PRODUCTS_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { removeProductData } from './productDataSlice';

export const deleteProduct =
  ({ id }: { id: number }): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      await API.delete(PRODUCTS_ENDPOINTS.DELETE_PRODUCT_ITEM(id));
      dispatch(removeProductData(id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
