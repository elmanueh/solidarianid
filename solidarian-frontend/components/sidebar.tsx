'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { authService } from '@/features/auth/services/auth.service';
import { ROUTES } from '@/features/routes';
import { IconHeart, IconHome, IconLogout2, IconSearch, IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

const navItems = [
  { title: 'Inicio', url: ROUTES.app.home, icon: <IconHome className="size-4" /> },
  { title: 'Explorar comunidades', url: ROUTES.app.explore, icon: <IconSearch className="size-4" /> },
  { title: 'Mis Causas', url: ROUTES.app.favorites, icon: <IconHeart className="size-4" /> },
  { title: 'Mi Perfil', url: ROUTES.app.profile, icon: <IconUser className="size-4" /> },
];

export function SidebarLateral() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-6">
        <Link href={ROUTES.app.home} className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 p-2 shadow-inner transition-transform group-hover:scale-110">
            <Image
              src="/solidarian-logo.png"
              alt="SolidarianID"
              width={30}
              height={30}
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-xl font-black tracking-tight text-brand-ink dark:text-primary">
              SolidarianID
            </span>
            <span className="text-[8px] leading-none font-bold tracking-widest text-neutral-400 uppercase">
              Social Impact Network
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map(item => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} className="block">
                    <SidebarMenuButton
                      isActive={isActive}
                      className={`mt-1 cursor-pointer rounded-2xl px-4 py-6 text-[10px] font-black tracking-[0.15em] uppercase transition-all dark:text-primary dark:hover:bg-gray-600 ${
                        isActive
                          ? 'dark:hover:text-secondary data-active:bg-sidebar-primary! data-active:font-bold data-active:text-sidebar-primary-foreground! data-active:hover:bg-sidebar-primary! data-active:hover:text-sidebar-primary-foreground! data-active:dark:bg-blue-800!'
                          : 'text-neutral-400 hover:bg-neutral-100 hover:text-brand-ink'
                      } `}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-2xl border border-brand-500/10 bg-brand-500/5 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-xs font-black text-white shadow-lg shadow-brand-500/20">
            JG
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-xs font-black tracking-wide text-brand-ink uppercase">Juan García</span>
            <span className="truncate text-[9px] font-bold text-neutral-400">@juan_dev</span>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="cursor-pointer items-center rounded-2xl py-6 ps-6 text-[10px] font-black tracking-widest text-neutral-400 uppercase hover:bg-red-50 hover:text-red-500 dark:text-primary dark:hover:bg-red-900"
              onClick={() => {
                authService.logout();
                redirect('/');
              }}
            >
              <IconLogout2 className="size-4" />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
