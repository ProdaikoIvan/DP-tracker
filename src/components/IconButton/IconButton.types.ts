import type { LucideIcon } from 'lucide-react';
import type { MouseEvent } from 'react';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'ghost' | 'outline';

export interface IconButtonProps {
  icon: LucideIcon;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  title: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  badge?: number | string;
}

