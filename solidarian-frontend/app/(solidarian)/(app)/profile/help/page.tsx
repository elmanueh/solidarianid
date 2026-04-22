import { IconArrowLeft, IconBook, IconMail } from '@tabler/icons-react';
import Link from 'next/link';

import { SupportCard, type SupportCardProps } from '@/components/profile/help/help-page-component';
import { ROUTES } from '@/features/routes';

type SupportChannel = SupportCardProps;

const faqs = [
  {
    question: '¿Cómo puedo unirme a una comunidad?',
    answer:
      "Puedes unirte a cualquier comunidad desde su perfil pulsando el botón 'Seguir'. Una vez dentro, recibirás notificaciones sobre sus causas y acciones.",
  },
  {
    question: '¿Qué diferencia hay entre una Causa y una Acción?',
    answer:
      'Una Causa es el objetivo general, por ejemplo reforestación, mientras que las Acciones son proyectos específicos con objetivos y eventos concretos dentro de esa causa.',
  },
  {
    question: '¿Puedo participar si no estoy registrado?',
    answer:
      'Sí, los usuarios no registrados pueden apoyar causas introduciendo su nombre y email, y recibirán actualizaciones sobre el progreso por correo electrónico.',
  },
  {
    question: '¿Cómo se miden mis contribuciones?',
    answer:
      'En tu perfil encontrarás estadísticas que reflejan tu impacto: horas de voluntariado, donaciones realizadas y acciones en las que has participado.',
  },
] as const;

const supportChannels: SupportChannel[] = [
  {
    icon: <IconMail size={20} />,
    label: 'Email',
    description: 'soporte@solidarianid.org',
    accentClassName: 'bg-brand-ink/10 text-brand-ink dark:bg-brand-500/10 dark:text-brand-500',
    href: 'mailto:soporte@solidarianid.org',
  },
];

export default function ProfileSettingsHelpPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pt-4 pb-24 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-20 rounded-4xl border border-border/70 bg-background/90 px-4 py-4 shadow-sm backdrop-blur-xl dark:bg-background/80">
          <div className="flex items-center gap-4">
            <Link
              href={ROUTES.app.profile}
              aria-label="Volver a configuración"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
            >
              <IconArrowLeft size={20} />
            </Link>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black tracking-[0.28em] text-muted-foreground uppercase">
                Centro de ayuda
              </p>
              <h1 className="truncate text-xl font-black tracking-tight text-brand-ink sm:text-2xl dark:text-foreground">
                Ayuda y Soporte
              </h1>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 pt-8">
          <section className="grid gap-4 sm:grid-cols-2">
            {supportChannels.map(channel => (
              <div
                key={channel.label}
                className="group rounded-[28px] border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5"
              >
                <SupportCard {...channel} />
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[10px] font-black tracking-[0.28em] text-muted-foreground uppercase">
                Preguntas Frecuentes
              </h2>
              <IconBook size={16} className="text-muted-foreground/60" />
            </div>

            <div className="space-y-3">
              {faqs.map(faq => (
                <article
                  key={faq.question}
                  className="rounded-[28px] border border-border bg-card p-5 shadow-sm transition-all hover:border-brand-500/25 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  <h3 className="mb-2 text-sm font-black tracking-tight text-brand-ink sm:text-base dark:text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
