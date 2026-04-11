'use client';
import { ROUTES } from '@/features/routes';
import { IconHeart, IconHome, IconSearch, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SidebarMobile() {
  const pathname = usePathname();

  const items = [
    { title: 'Home', url: ROUTES.app.home, icon: <IconHome size={24} /> },
    { title: 'Explorar', url: ROUTES.app.explore, icon: <IconSearch size={24} /> },
    { title: 'Causas', url: ROUTES.app.favorites, icon: <IconHeart size={24} /> },
    { title: 'Perfil', url: ROUTES.app.profile, icon: <IconUser size={24} /> },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-20 items-center justify-around rounded-t-4xl border-t bg-white px-6 pb-4 md:hidden dark:bg-secondary">
      {items.map(item => {
        const isActive = pathname === item.url;

        return (
          <Link
            key={item.title}
            href={item.url}
            className={`flex flex-col items-center gap-1 dark:text-primary ${isActive ? 'text-brand-500' : 'text-neutral-400'}`}
          >
            <div className={`rounded-xl p-1 ${isActive ? 'bg-brand-500/10 dark:bg-blue-800' : ''}`}>{item.icon}</div>
            <span className="text-[9px] font-black tracking-widest uppercase">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
