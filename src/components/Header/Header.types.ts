export interface HeaderProps {
  onBack?: () => void;
  showBackButton?: boolean;
  onReset?: () => void;
  onOpenStats?: () => void;
  hasSlots?: boolean;
  slotsCount?: number;
  isSoundEnabled?: boolean;
  onToggleSound?: () => void;
}
