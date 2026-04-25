const COMMUNITY_IMAGE_URLS = [
  'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6995221/pexels-photo-6995221.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6646863/pexels-photo-6646863.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6647024/pexels-photo-6647024.jpeg?auto=compress&cs=tinysrgb&w=1600',
] as const;

function getStableImageIndex(seed: string, poolSize: number): number {
  const sum = seed.split('').reduce((accumulator, character) => accumulator + (character.codePointAt(0) ?? 0), 0);

  return sum % poolSize;
}

export function getCommunityImageUrl(communityId: string): string {
  const imageIndex = getStableImageIndex(communityId, COMMUNITY_IMAGE_URLS.length);

  return COMMUNITY_IMAGE_URLS[imageIndex];
}
