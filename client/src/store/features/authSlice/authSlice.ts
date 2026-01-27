import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../../../types/types';

const initialState: IAuth = {
  id: 0,
  firstName: '',
  lastName: '',
  age: 0,
  gender: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  birthDate: '',
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuthData: (state, action) => ({
      ...action.payload,
    }),
    clearAuthData: () => ({ ...initialState }),
  },
});

export default authSlice;
export const { setAuthData, clearAuthData } = authSlice.actions;
