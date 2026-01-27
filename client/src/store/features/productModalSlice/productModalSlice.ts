import { createSlice } from '@reduxjs/toolkit';
import { IProductModal } from '../../../types/types';

const initialState: IProductModal = {
  isOpen: false,
  type: 'edit',
  values: {
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
  },
};
const productModalSlice = createSlice({
  name: 'productModal',
  initialState: initialState,
  reducers: {
    openProductModal: (state, action) => {
      state.type = action.payload.type;
      if (action.payload.type === 'add') {
        state.values = initialState.values;
      } else {
        state.values = action.payload.values;
      }
      state.isOpen = true;
    },
    closeProductModel: (state) => {
      state.isOpen = false;
      state.type = 'add';
      state.values = initialState.values;
    },
  },
});
export default productModalSlice;
export const { openProductModal, closeProductModel } =
  productModalSlice.actions;
