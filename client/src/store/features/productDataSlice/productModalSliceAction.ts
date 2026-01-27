import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../types/types';
import API from '../../../utility/API';
import { PRODUCTS_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { closeProductModel } from '../productModalSlice/productModalSlice';
import { setSingleProduct } from './productDataSlice';

interface IState {
  id: number;
  values: IProduct[];
}
export const modalAction =
  ({ id, values }: IState): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const response = await API.patch(
      PRODUCTS_ENDPOINTS.EDIT_PRODUCT(id),
      values
    );
    dispatch(setSingleProduct(response.data));
    dispatch(closeProductModel());
  };
