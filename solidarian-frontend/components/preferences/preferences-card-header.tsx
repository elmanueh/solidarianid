interface PreferencesCardHeaderProps {
  stepper: {
    state: {
      current: {
        data: {
          icon: React.ReactNode;
          title: string;
          description: string;
        };
      };
    };
  };
  currentId: 'category' | 'duration' | 'ods' | 'notifications';
}

export function PreferencesCardHeader({ stepper, currentId }: Readonly<PreferencesCardHeaderProps>) {
  const stepTheme = {
    category: {
      accent: 'text-preferences-primary',
    },
    duration: {
      accent: 'text-warning',
    },
    ods: {
      accent: 'text-success',
    },
    notifications: {
      accent: 'text-preferences-primary',
    },
  }[currentId];

  return (
    <header className="mb-10 flex items-start gap-4">
      <div className={stepTheme.accent}>{stepper.state.current.data.icon}</div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-black tracking-widest text-preferences-ink uppercase">
          {stepper.state.current.data.title}
        </h2>
        <p className="text-xs font-bold tracking-widest text-preferences-muted uppercase">
          {stepper.state.current.data.description}
        </p>
      </div>
    </header>
  );
}
