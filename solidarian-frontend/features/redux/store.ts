import { authSlice } from '@/features/redux/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
