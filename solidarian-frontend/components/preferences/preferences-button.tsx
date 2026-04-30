import { cn } from '@/lib/utils';

interface PreferencesButtonProps {
  name: string;
  handleAction: () => void | Promise<void>;
  className?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
}

export function PreferencesButton({
  name,
  handleAction,
  className,
  iconRight,
  iconLeft,
  disabled = false,
}: Readonly<PreferencesButtonProps>) {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
      name={name}
      type="button"
      onClick={handleAction}
      disabled={disabled}
    >
      {iconLeft}
      {name}
      {iconRight}
    </button>
  );
}
