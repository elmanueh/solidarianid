import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import type { ReactNode } from 'react';

interface RequestSectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function RequestSectionCard({ title, description, children }: Readonly<RequestSectionCardProps>) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-muted/10 shadow-sm">
      <CardHeader className="px-4 pt-4 sm:px-5">
        <CardTitle className="text-sm font-semibold tracking-tight text-foreground">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5">{children}</CardContent>
    </Card>
  );
}
