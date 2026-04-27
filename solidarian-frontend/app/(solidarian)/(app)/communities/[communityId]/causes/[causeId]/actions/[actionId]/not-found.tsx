'use client';

import RouteNotFound from '@/components/route-not-found';
import { useParams } from 'next/navigation';

export default function ActionNotFound() {
  const params = useParams<{ communityId?: string; causeId?: string }>();
  const communityId = typeof params.communityId === 'string' ? params.communityId : undefined;
  const causeId = typeof params.causeId === 'string' ? params.causeId : undefined;

  return <RouteNotFound entity="action" communityId={communityId} causeId={causeId} />;
}
