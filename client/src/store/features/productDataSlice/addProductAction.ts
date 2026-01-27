import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../types/types';
import API from '../../../utility/API';
import { PRODUCTS_ENDPOINTS } from '../../../utility/Constants/END_POINTS';
import { RootState } from '../../store';
import { closeProductModel } from '../productModalSlice/productModalSlice';
import { addProductData } from './productDataSlice';

export const addProductAction =
  ({
    values,
  }: {
    values: IProduct;
  }): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const products = await API.post(PRODUCTS_ENDPOINTS.ADD_PRODUCT, values);
    const newProduct: IProduct = products.data;
    dispatch(addProductData(newProduct));
    dispatch(closeProductModel());
  };
