'use client';

import { User } from '@/features/auth/model/user';
import { authService } from '@/features/auth/services/auth.service';
import { handleLogin } from '@/features/redux/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function initializeAuth() {
      const user: User = await authService.getCurrentUser();

      if (!user) return;

      dispatch(handleLogin(user));
    }

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
