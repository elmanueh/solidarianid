'use client';

import RouteNotFound from '@/components/route-not-found';
import { useParams } from 'next/navigation';

export default function CauseNotFound() {
  const params = useParams<{ communityId?: string }>();
  const communityId = typeof params.communityId === 'string' ? params.communityId : undefined;

  return <RouteNotFound entity="cause" communityId={communityId} />;
}
