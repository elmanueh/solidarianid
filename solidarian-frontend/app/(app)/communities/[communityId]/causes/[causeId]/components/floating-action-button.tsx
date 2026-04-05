import { ROUTES } from '@/infrastructure/navigation/routes';
import { IconFilePlus } from '@tabler/icons-react';
import Link from 'next/link';

interface FloatingActionButtonProps {
  communityId: string;
  causeId: string;
}

export function FloatingActionButton({ communityId, causeId }: Readonly<FloatingActionButtonProps>) {
  return (
    <Link
      href={ROUTES.communities.causeRequestCreate(communityId, causeId)}
      className="fixed right-6 bottom-24 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-[#7CC342] to-[#F7941D] text-white shadow-2xl shadow-[#7CC342]/30 transition-all hover:scale-110 active:scale-95 lg:right-8 lg:bottom-8 dark:shadow-[#7CC342]/20"
      aria-label="Solicitar nueva acción"
    >
      <IconFilePlus size={28} strokeWidth={2.5} />
    </Link>
  );
}
