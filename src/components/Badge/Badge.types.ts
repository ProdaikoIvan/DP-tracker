import type { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  title?: string;
}
