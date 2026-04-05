'use client';

import { Button } from '@/components/ui/button';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

interface BackButtonProps {
  url: string;
}

export default function BackButton({ url }: Readonly<BackButtonProps>) {
  return (
    <Button
      variant="outline"
      size="default"
      nativeButton={false}
      render={<Link href={url} aria-label="Volver" />}
      className="h-10 w-10 cursor-pointer rounded-full border-neutral-100 bg-white/50 px-3 text-neutral-800 backdrop-blur-md transition-all duration-200 hover:-translate-y-px hover:border-neutral-200 hover:bg-white/80 hover:shadow-sm focus-visible:-translate-y-px focus-visible:border-neutral-200 focus-visible:bg-white/80 focus-visible:shadow-sm active:scale-95 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-900/70 dark:focus-visible:border-neutral-600 dark:focus-visible:bg-neutral-900/70"
    >
      <IconArrowLeft size={20} />
    </Button>
  );
}
