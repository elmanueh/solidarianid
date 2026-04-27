type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

export function SectionHeader({ title, subtitle }: Readonly<SectionHeaderProps>) {
  return (
    <header className="flex flex-col gap-3 px-1 py-4 lg:px-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">{title}</h1>
        <p className="text-sm font-bold tracking-[0.25em] text-muted-foreground uppercase md:text-base">{subtitle}</p>
      </div>
    </header>
  );
}

export type { SectionHeaderProps };
