'use client';

import { ROUTES } from '@/features/routes';
import { IconFilePlus } from '@tabler/icons-react';
import Link from 'next/link';

export function ExploreFloatingActionButton() {
  return (
    <Link
      href={ROUTES.explore.requestsCreate}
      className="fixed right-6 bottom-24 z-40 flex items-center gap-3 rounded-full bg-linear-to-r from-[#7CC342] to-[#F7941D] px-5 py-4 text-white shadow-lg shadow-[#7CC342]/30 transition-transform hover:scale-105 active:scale-95 lg:right-8 lg:bottom-8"
      aria-label="Solicitar la creación de una nueva comunidad"
    >
      <IconFilePlus size={24} strokeWidth={2.5} />
      <span className="hidden text-xs font-black tracking-[0.15em] uppercase sm:inline">Nueva comunidad</span>
    </Link>
  );
}
