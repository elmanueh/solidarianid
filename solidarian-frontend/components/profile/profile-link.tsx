import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type ProfileLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
};

export function ProfileLink({ href, icon, label }: ProfileLinkProps) {
  return (
    <Link
      href={href}
      className="group flex w-full items-center justify-between rounded-3xl p-6 text-left transition-all hover:bg-accent"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500/10 group-hover:text-brand-500">
          {icon}
        </div>
        <span className="text-sm font-black tracking-widest text-brand-ink uppercase opacity-80 group-hover:opacity-100">
          {label}
        </span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/60 transition-all group-hover:translate-x-1 group-hover:text-brand-500">
        <IconChevronRight size={18} />
      </div>
    </Link>
  );
}
