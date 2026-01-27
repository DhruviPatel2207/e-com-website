import { createSlice } from '@reduxjs/toolkit';

const uiStateSlice = createSlice({
  name: 'uiState',
  initialState: {
    cartDrawerState: false,
  },
  reducers: {
    toggleCartDrawer: (state) => {
      state.cartDrawerState = !state.cartDrawerState;
    },
  },
});
export default uiStateSlice;
export const uiStateActions = uiStateSlice.actions;
