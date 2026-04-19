import { toonHead } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

export function getDicebearSvg(username: string): string {
  //return `https://api.dicebear.com/9.x/toon-head/svg?seed=${encodeURIComponent(username)}`;
  const avatar = createAvatar(toonHead, {
    seed: username,
    backgroundColor: [
      'b6e3f4',
      'c0aede',
      'd1d4f9',
      'ffdfbf',
      'ffadad',
      'ffd6a5',
      'fdffb6',
      'caffbf',
      '9bf6ff',
      'a0c4ff',
      'bdb2ff',
      'ffc6ff',
    ],
    backgroundType: ['gradientLinear', 'solid'],
  });
  return avatar.toString();
}
