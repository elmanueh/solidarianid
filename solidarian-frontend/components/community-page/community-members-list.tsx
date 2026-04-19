import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { UserAvatar } from '@/components/user-avatar';
import { IconShield } from '@tabler/icons-react';

type CommunityMemberRole = 'creator' | 'admin' | 'member';

interface CommunityMember {
  id: string;
  fullName: string;
  role: CommunityMemberRole;
}

interface CommunityMembersListProps {
  members: CommunityMember[];
}

const roleLabelByType: Record<CommunityMemberRole, string> = {
  creator: 'Creador',
  admin: 'Admin',
  member: 'Miembro',
};

const roleBadgeClassByType: Record<CommunityMemberRole, string> = {
  creator: 'border-brand-500/20 bg-brand-500/10 text-brand-500',
  admin: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  member: 'border-border bg-background text-muted-foreground',
};

export default function CommunityMembersList({ members }: Readonly<CommunityMembersListProps>) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-brand-ink dark:text-foreground">
          <IconShield size={20} className="text-brand-500" />
          Miembros de la comunidad
        </h3>
        <Badge
          variant="outline"
          className="h-auto border-border bg-background px-2.5 py-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
        >
          {members.length} miembros
        </Badge>
      </div>

      <Card className="rounded-3xl border-border bg-card shadow-sm">
        <CardContent className="divide-y divide-border p-0">
          {members.length > 0 ? (
            members.map(member => {
              return (
                <div key={member.id} className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar username={member.fullName} size="lg" />
                    <span className="truncate text-sm font-semibold text-brand-ink dark:text-foreground">
                      {member.fullName}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className={`h-auto border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${roleBadgeClassByType[member.role]}`}
                  >
                    {roleLabelByType[member.role]}
                  </Badge>
                </div>
              );
            })
          ) : (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Esta comunidad aun no tiene miembros visibles.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
