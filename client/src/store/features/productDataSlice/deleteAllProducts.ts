import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import API from '../../../utility/API';
import { PRODUCTS_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { clearList } from './productDataSlice';

export const deleteAllProduct =
  (
    productsToDelete: number[]
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      console.log('sjhsdbh ===>', productsToDelete);

      productsToDelete.forEach(async (id) => {
        await API.delete(PRODUCTS_ENDPOINTS.DELETE_PRODUCT_ITEM(id));
        dispatch(clearList(id));
        return id;
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
