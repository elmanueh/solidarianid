import { cn } from '@/lib/utils';

interface PreferencesButtonProps {
  name: string;
  handleAction: () => void;
  className?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

export function PreferencesButton({
  name,
  handleAction,
  className,
  iconRight,
  iconLeft,
}: Readonly<PreferencesButtonProps>) {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all',
        className
      )}
      name={name}
      onClick={handleAction}
    >
      {iconLeft}
      {name}
      {iconRight}
    </button>
  );
}
