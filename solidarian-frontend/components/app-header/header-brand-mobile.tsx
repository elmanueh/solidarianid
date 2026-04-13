import { ROUTES } from '@/features/routes';
import Image from 'next/image';
import Link from 'next/link';

export function HeaderBrandMobile() {
  return (
    <div className="md:hidden">
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
          <span className="text-[8px] leading-none font-bold tracking-widest text-neutral-400 uppercase dark:text-neutral-200">
            Social Impact Network
          </span>
        </div>
      </Link>
    </div>
  );
}
