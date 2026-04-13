'use client';

import { Button } from '@/components/ui/button';
import { IconShare } from '@tabler/icons-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: Readonly<ShareButtonProps>) {
  const handleShare = async () => {
    if (!navigator.share) return;

    try {
      const shareUrl = new URL(url, globalThis.location.origin).toString();
      await navigator.share({ title, text, url: shareUrl });
    } catch {}
  };

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={handleShare}
      className="cursor-pointer rounded-full border-border bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background active:scale-95"
    >
      <IconShare size={20} />
    </Button>
  );
}
