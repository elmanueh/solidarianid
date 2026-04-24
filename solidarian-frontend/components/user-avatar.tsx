import { getDicebearSvg } from '@/features/images/dice-image.service';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserAvatarProps {
  username: string;
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function UserAvatar({ username, size = 'default', className }: Readonly<UserAvatarProps>) {
  const normalizedUsername = username.trim();
  const displayName = normalizedUsername || 'Usuario';
  const svg = getDicebearSvg(displayName);
  const src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const fallback = displayName.slice(0, 2).toUpperCase();

  return (
    <Avatar size={size} className={cn(className)}>
      <AvatarImage src={src} alt={displayName} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
