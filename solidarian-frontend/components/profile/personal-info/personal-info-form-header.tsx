'use client';

import BackButton from '@/components/back-button';

interface PersonalInfoFormHeaderProps {
  backUrl: string;
  eyebrow: string;
  title: string;
  description: string;
}

export function PersonalInfoFormHeader({
  backUrl,
  eyebrow,
  title,
  description,
}: Readonly<PersonalInfoFormHeaderProps>) {
  return (
    <div className="flex items-start gap-4">
      <BackButton url={backUrl} />

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black tracking-[0.28em] text-muted-foreground uppercase">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-brand-ink md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed font-medium text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
