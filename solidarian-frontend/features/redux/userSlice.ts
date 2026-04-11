import { User } from '@/features/auth/model/user';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: User | null;
}

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    currentUser: null,
  } as UserState,

  reducers: {
    handleLogin: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    handleLogout: state => {
      state.currentUser = null;
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;
