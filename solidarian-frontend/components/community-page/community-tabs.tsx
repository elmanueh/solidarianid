'use client';

import CommunityCausesList from '@/components/community-page/community-causes-list';
import { CommunityInfoCard } from '@/components/community-page/community-info-card';
import CommunityMembersList from '@/components/community-page/community-members-list';
import { OdsId } from '@/features/causes/constants/ods.constants';
import { useState } from 'react';

type CommunityTab = 'info' | 'causes' | 'members';
type CommunityMemberRole = 'creator' | 'admin' | 'member';

interface CommunityTabsProps {
  communityId: string;
  description: string;
  initialIsMember: boolean;
  isCurrentUserCreator: boolean;
  creatorName: string;
  causes: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    ods: OdsId[];
    imageUrl: string;
  }[];
  members: {
    id: string;
    fullName: string;
    role: CommunityMemberRole;
  }[];
}

const tabLabelByType: Record<CommunityTab, string> = {
  info: 'Sobre la comunidad',
  causes: 'Causas',
  members: 'Miembros',
};

function TabButton({ active, onClick, label }: Readonly<{ active: boolean; onClick: () => void; label: string }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer border-b-2 px-1 py-3 text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-colors ${
        active ? 'border-brand-500 text-brand-500' : 'border-transparent text-muted-foreground hover:text-brand-ink'
      }`}
    >
      {label}
    </button>
  );
}

export default function CommunityTabs({
  communityId,
  description,
  initialIsMember,
  isCurrentUserCreator,
  creatorName,
  causes,
  members,
}: Readonly<CommunityTabsProps>) {
  const [activeTab, setActiveTab] = useState<CommunityTab>('info');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-5 overflow-x-auto border-b border-border">
        <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')} label={tabLabelByType.info} />
        <TabButton
          active={activeTab === 'causes'}
          onClick={() => setActiveTab('causes')}
          label={`${tabLabelByType.causes} (${causes.length})`}
        />
        <TabButton
          active={activeTab === 'members'}
          onClick={() => setActiveTab('members')}
          label={`${tabLabelByType.members} (${members.length})`}
        />
      </div>

      {activeTab === 'info' ? (
        <CommunityInfoCard
          communityId={communityId}
          description={description}
          initialIsMember={initialIsMember}
          creatorName={creatorName}
          isCreator={isCurrentUserCreator}
          causesLength={causes.length}
          membersLenght={members.length}
        />
      ) : null}

      {activeTab === 'causes' ? <CommunityCausesList communityId={communityId} causes={causes} /> : null}
      {activeTab === 'members' ? <CommunityMembersList members={members} /> : null}
    </div>
  );
}
