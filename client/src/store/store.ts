import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice/authSlice';
import cartSlice from './features/cartSlice/cartSlice';
import orderSlice from './features/orderSlice/orderSlice';
import productDataSlice from './features/productDataSlice/productDataSlice';
import productModalSlice from './features/productModalSlice/productModalSlice';
import uiStateSlice from './features/uiState/uiStateSlice';
import wishListSlice from './features/wishListSlice/wishListSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productDataSlice.reducer,
    wishList: wishListSlice.reducer,
    cart: cartSlice.reducer,
    uiState: uiStateSlice.reducer,
    order: orderSlice.reducer,
    productModal: productModalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
