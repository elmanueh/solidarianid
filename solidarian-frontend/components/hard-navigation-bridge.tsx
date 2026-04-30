'use client';

import { useEffect, type ReactNode } from 'react';

interface HardNavigationBridgeProps {
  children: ReactNode;
}

function isModifiedClick(event: MouseEvent): boolean {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function getAnchorFromEventTarget(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof HTMLElement)) {
    return null;
  }

  const anchor = target.closest('a[href]');

  return anchor instanceof HTMLAnchorElement ? anchor : null;
}

function shouldForceHardNavigation(anchor: HTMLAnchorElement): boolean {
  if (anchor.hasAttribute('download') || anchor.target === '_blank') {
    return false;
  }

  const href = anchor.getAttribute('href');

  if (!href) {
    return false;
  }

  const resolvedUrl = new URL(href, globalThis.location.href);

  return resolvedUrl.origin === globalThis.location.origin;
}

export function HardNavigationBridge({ children }: Readonly<HardNavigationBridgeProps>) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const anchor = getAnchorFromEventTarget(event.target);

      if (!anchor || !shouldForceHardNavigation(anchor)) {
        return;
      }

      event.preventDefault();
      globalThis.location.assign(new URL(anchor.getAttribute('href') ?? '', globalThis.location.href).toString());
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return <>{children}</>;
}
