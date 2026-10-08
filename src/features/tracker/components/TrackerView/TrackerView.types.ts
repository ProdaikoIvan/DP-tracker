import type { City, Country } from '@/features/department';

export interface TrackerViewProps {
  city: City;
  country: Country;
  onBack: () => void;
}
