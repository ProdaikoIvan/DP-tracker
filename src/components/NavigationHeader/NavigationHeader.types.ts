export interface NavigationHeaderProps {
  onBack: () => void;
  title: string;
  countryCode?: string;
  subtitle?: string;
  badge?: number | string;
}
