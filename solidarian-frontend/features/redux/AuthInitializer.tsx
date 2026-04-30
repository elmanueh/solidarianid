'use client';

import { User } from '@/features/auth/model/user';
import { authService } from '@/features/auth/services/auth.service';
import { ROUTES } from '@/features/routes';
import { handleLogin } from '@/features/redux/userSlice';
import { IconLoaderQuarter } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

const PUBLIC_AUTH_ROUTES: ReadonlyArray<string> = [ROUTES.auth.login, ROUTES.auth.register];

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    async function initializeAuth() {
      try {
        setLoading(true);
        const user: User = await authService.getCurrentUser({ skipLoginRedirect: isPublicAuthRoute });

        if (!user) return;

        dispatch(handleLogin(user));

        if (isPublicAuthRoute) {
          router.replace(ROUTES.app.home);
          return;
        }
      } catch (error) {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
          console.error('Error fetching current user:', error);
        }
        return;
      } finally {
        setLoading(false);
      }
    }

    void initializeAuth();
  }, [dispatch, isPublicAuthRoute, pathname, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <IconLoaderQuarter className="animate-spin" size={50} />
      </div>
    );
  }

  return children;
}
