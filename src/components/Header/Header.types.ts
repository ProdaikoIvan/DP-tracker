export interface HeaderProps {
  showBackButton: boolean;
  onBack: () => void;
  onReset: () => void;
  onOpenStats: () => void;
  slotsCount: number;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}
