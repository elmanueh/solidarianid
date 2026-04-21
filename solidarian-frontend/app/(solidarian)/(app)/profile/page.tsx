'use client';

import {
  IconCalendarEvent,
  IconFilePlus,
  IconInfoCircle,
  IconLogout2,
  IconSettings,
  IconShare,
  IconShieldCheck,
  IconStar,
  IconTargetArrow,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { toast } from 'sonner';

import { ProfileLink } from '@/components/profile/profile-link';
import { Button } from '@/components/ui';
import { useAppSelector } from '@/features/redux/redux-hook';
import { ROUTES } from '@/features/routes';
import { useProfileImpactStats } from '@/hooks/use-profile-impact-stats';

type Stat = {
  label: string;
  value: string | number;
  icon: ReactNode;
  colorClassName: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.currentUser);
  const { data: impactStats, loading: impactStatsLoading, error: impactStatsError } = useProfileImpactStats(user?.id);

  const stats: Stat[] = [
    {
      label: 'Aportes',
      value: impactStatsLoading || impactStatsError ? '—' : (impactStats?.contributions ?? 0),
      icon: <IconTargetArrow className="text-chart-3" />,
      colorClassName: 'bg-chart-3/10',
    },
    {
      label: 'Objetivos',
      value: impactStatsLoading || impactStatsError ? '—' : (impactStats?.objectives ?? 0),
      icon: <IconStar className="text-chart-4" />,
      colorClassName: 'bg-chart-4/10',
    },
    {
      label: 'Eventos',
      value: impactStatsLoading || impactStatsError ? '—' : (impactStats?.events ?? 0),
      icon: <IconCalendarEvent className="text-brand-500" />,
      colorClassName: 'bg-brand-500/10',
    },
    {
      label: 'Comunidades',
      value: impactStatsLoading || impactStatsError ? '—' : (impactStats?.communities ?? 0),
      icon: <IconUsers className="text-brand-ink" />,
      colorClassName: 'bg-brand-ink/10',
    },
  ];

  const handleLogout = () => {
    toast.info('Sesión cerrada');
    router.push('/');
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-2 pb-24 lg:gap-16 lg:pb-12">
      <header className="relative flex flex-col items-center gap-8 px-4 pt-8 md:flex-row md:items-end">
        <div className="flex flex-1 flex-col items-center gap-3 text-center md:items-start md:text-left">
          <div className="flex flex-col">
            <h2 className="text-3xl font-black tracking-tight text-brand-ink md:text-5xl">{user?.fullName}</h2>
            <p className="mt-1 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase md:text-sm">
              {user?.city}, {user?.countryCode}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 self-start rounded-3xl border border-border bg-card px-6 py-4 shadow-sm md:flex">
          <IconShare size={14} className="text-muted-foreground/70" />
          <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
            solidarianid/{user?.username}
          </span>
        </div>
      </header>

      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-brand-ink shadow-sm">
            <IconTargetArrow size={20} />
          </div>
          <h3 className="text-xl font-black tracking-widest text-brand-ink uppercase">Tu Impacto</h3>
        </div>

        {impactStatsError ? (
          <p className="px-4 text-sm font-medium text-muted-foreground">No se pudieron cargar tus stats de impacto.</p>
        ) : null}

        <div className="grid grid-cols-2 gap-6 px-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex h-full flex-col items-center justify-center gap-3 rounded-[40px] border border-border bg-card p-8 text-center shadow-sm transition-all hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-500/5 active:scale-95"
            >
              <div
                className={`mb-2 flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${stat.colorClassName}`}
              >
                {stat.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-3xl font-black tracking-tight text-brand-ink">{stat.value}</span>
                <span className="text-[10px] font-black tracking-[0.15em] text-muted-foreground uppercase">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mb-10 grid grid-cols-1 gap-10 px-4 md:grid-cols-2">
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-brand-ink shadow-sm">
              <IconSettings size={20} />
            </div>
            <h3 className="text-xl font-black tracking-widest text-brand-ink uppercase">Configuración</h3>
          </div>
          <div className="flex flex-col divide-y divide-border overflow-hidden rounded-[40px] border border-border bg-card p-2 shadow-sm">
            <ProfileLink href={ROUTES.profile.requests} icon={<IconFilePlus size={18} />} label="Mis Solicitudes" />
            <ProfileLink
              href={ROUTES.profile.personalInfo}
              icon={<IconUser size={18} />}
              label="Información Personal"
            />
            <ProfileLink
              href={ROUTES.profile.impact}
              icon={<IconSettings size={18} />}
              label="Preferencias de Impacto"
            />
            <ProfileLink
              href={ROUTES.profile.privacy}
              icon={<IconShieldCheck size={18} />}
              label="Privacidad y Seguridad"
            />
            <ProfileLink href={ROUTES.profile.help} icon={<IconInfoCircle size={18} />} label="Centro de Ayuda" />
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-destructive shadow-sm">
              <IconLogout2 size={20} />
            </div>
            <h3 className="text-xl font-black tracking-widest text-brand-ink uppercase">Cuenta</h3>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 rounded-[40px] border border-border bg-card p-10 text-center shadow-sm">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-black tracking-tight text-brand-ink">¿Deseas cerrar tu sesión?</h4>
              <p className="max-w-50 text-[10px] leading-loose font-bold tracking-widest text-muted-foreground uppercase">
                Tu progreso de impacto se guardará de forma segura.
              </p>
            </div>
            <Button
              type="button"
              onClick={handleLogout}
              className="h-auto w-full justify-center gap-3 rounded-[28px] border border-destructive/20 bg-destructive/10 p-5 text-[10px] font-black tracking-[0.2em] text-destructive uppercase shadow-sm transition-all hover:bg-destructive hover:text-destructive-foreground hover:shadow-xl active:scale-95"
            >
              <IconLogout2 size={18} />
              <span>Cerrar Sesión Ahora</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
