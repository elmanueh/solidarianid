'use client';

import { User } from '@/features/auth/model/user';
import { authService } from '@/features/auth/services/auth.service';
import { handleLogin } from '@/features/redux/userSlice';
import { IconLoaderQuarter } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      try {
        setLoading(true);
        const user: User = await authService.getCurrentUser();

        if (!user) return;

        dispatch(handleLogin(user));
      } catch (error) {
        console.error('Error fetching current user:', error);
        return;
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <IconLoaderQuarter className="animate-spin" size={50} />
      </div>
    );
  }

  return children;
}
