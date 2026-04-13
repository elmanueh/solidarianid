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
      size="icon"
      nativeButton={false}
      render={<Link href={url} aria-label="Volver" />}
      className="rounded-full border-border bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background active:scale-95"
    >
      <IconArrowLeft size={20} />
    </Button>
  );
}
