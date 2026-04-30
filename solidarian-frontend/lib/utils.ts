import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToSpanish(dateString: string): string {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Fecha no disponible';
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);
}

export function formatNotificationTime(createdAt?: Date) {
  if (!createdAt) {
    return 'Sin fecha';
  }

  const value = createdAt instanceof Date ? createdAt : new Date(createdAt);
  if (Number.isNaN(value.getTime())) {
    return 'Sin fecha';
  }

  const now = new Date();
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfValue = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const daysDiff = Math.floor((startOfNow.getTime() - startOfValue.getTime()) / 86400000);

  if (daysDiff <= 0) {
    return value.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (daysDiff === 1) {
    return 'Ayer';
  }

  if (daysDiff <= 6) {
    return `Hace ${daysDiff} dias`;
  }

  return value.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
  });
}
