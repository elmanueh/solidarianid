import { RootState } from '@/features/redux/store';
import { getCurrentUserAsync, loginUserAsync, logout } from '@/features/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { loggedInUser, isLoading, error } = useSelector((state: RootState) => state.user);

  return {
    user: loggedInUser,
    isLoading,
    error,
    isAuthenticated: !!loggedInUser,
    login: (username: string, password: string) => dispatch(loginUserAsync({ username, password })),
    getCurrentUser: () => dispatch(getCurrentUserAsync()),
    logout: () => dispatch(logout()),
  };
};
