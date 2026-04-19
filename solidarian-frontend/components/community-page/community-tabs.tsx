'use client';

import CommunityCausesList from '@/components/community-page/community-causes-list';
import CommunityJoinButton from '@/components/community-page/community-join-button';
import CommunityMembersList from '@/components/community-page/community-members-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';

type CommunityTab = 'info' | 'causes' | 'members';
type CommunityMemberRole = 'creator' | 'admin' | 'member';

interface CommunityTabsProps {
  communityId: string;
  description: string;
  imageUrl: string;
  initialIsMember: boolean;
  creatorName: string;
  causes: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    ods: string[];
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
      className={`border-b-2 px-1 py-3 text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-colors ${
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
  imageUrl,
  initialIsMember,
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
        <Card className="gap-0 rounded-3xl border-border shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-base font-bold text-brand-ink dark:text-foreground">
                  <IconInfoCircle size={18} className="text-brand-500" />
                  Sobre la comunidad
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </CardDescription>
              </div>
              <CommunityJoinButton communityId={communityId} initialIsMember={initialIsMember} />
            </div>
          </CardHeader>

          <CardContent className="pt-0 pb-6">
            <Separator />
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background px-4 py-3">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Creador</p>
                <p className="mt-1 font-semibold text-brand-ink dark:text-foreground">{creatorName}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background px-4 py-3">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Causas activas</p>
                <p className="mt-1 font-semibold text-brand-ink dark:text-foreground">{causes.length}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background px-4 py-3">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Miembros</p>
                <p className="mt-1 font-semibold text-brand-ink dark:text-foreground">{members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {activeTab === 'causes' ? (
        <CommunityCausesList communityId={communityId} causes={causes} imageUrl={imageUrl} />
      ) : null}
      {activeTab === 'members' ? <CommunityMembersList members={members} /> : null}
    </div>
  );
}
