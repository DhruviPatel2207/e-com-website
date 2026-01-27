import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../../types/types';

interface IProductData {
  allProducts: IProduct[];
  filteredProducts: IProduct[];
  filters: {
    search: string;
    rating: number;
    priceRang: { min: number; max: number };
    discountRang: { min: number; max: number };
    categories: string;
  };
}

const initialState: IProductData = {
  allProducts: [],
  filteredProducts: [],
  filters: {
    search: '',
    rating: 2,
    priceRang: { min: 0, max: 2000 },
    discountRang: { min: 0, max: 100 },
    categories: '',
  },
};

const productDataSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setProductData: (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    },
    setFilterData: (state, action) => {
      state.filters = action.payload;

      state.filteredProducts = state.allProducts.filter(
        (data) =>
          data.discountPercentage >= state.filters.discountRang.min &&
          data.discountPercentage <= state.filters.discountRang.max &&
          data.price <= state.filters.priceRang.max &&
          data.price >= state.filters.priceRang.min &&
          data.rating >= state.filters.rating &&
          data.category
            .toLowerCase()
            .includes(state.filters.categories.toLowerCase()) &&
          data.title.toLowerCase().includes(state.filters.search.toLowerCase())
      );
    },
    setSingleProduct: (state, action) => {
      const initialvalue: IProduct[] = [];
      state.allProducts = state.allProducts.reduce((acc, product) => {
        if (product.id === action.payload.id) {
          acc.push(action.payload);
        } else {
          acc.push(product);
        }
        return acc;
      }, initialvalue);
    },
    addProductData: (state, action) => {
      state.allProducts.push(action.payload);
    },
    removeProductData: (state, action) => {
      state.allProducts = state.allProducts.filter(
        ({ id }) => id !== action.payload
      );
    },
    clearList: (state, action) => {
      state.allProducts = state.allProducts.filter(
        ({ id }) => id !== action.payload
      );
    },
  },
});
export default productDataSlice;
export const {
  setSingleProduct,
  setFilterData,
  setProductData,
  addProductData,
  removeProductData,
  clearList,
} = productDataSlice.actions;
