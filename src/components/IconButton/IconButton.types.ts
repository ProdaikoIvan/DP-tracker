import type { LucideIcon } from 'lucide-react';
import type { MouseEvent } from 'react';

export type IconButtonSize = 'sm' | 'md';

export interface IconButtonProps {
  icon: LucideIcon;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  title: string;
  size?: IconButtonSize;
  className?: string;
  disabled?: boolean;
}
