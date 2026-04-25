import { IconFilePlus } from '@tabler/icons-react';
import Link from 'next/link';

interface CommunityFloatingActionButtonProps {
  communityId: string;
}

export default function CommunityFloatingActionButton({ communityId }: Readonly<CommunityFloatingActionButtonProps>) {
  return (
    <Link
      href={`/communities/${communityId}/causes/requests/create`}
      className="fixed right-6 bottom-24 z-40 grid size-16 place-items-center rounded-full bg-linear-to-r from-[#7CC342] to-[#F7941D] text-white shadow-lg shadow-[#7CC342]/30 transition-transform hover:scale-110 active:scale-95 lg:right-8 lg:bottom-8"
      aria-label="Solicitar nueva causa"
    >
      <IconFilePlus size={28} strokeWidth={2.5} />
    </Link>
  );
}
