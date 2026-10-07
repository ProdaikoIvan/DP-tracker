import type { Country } from '../../types/departments.types';

export interface CountryCardProps {
  country: Country;
  onClick?: () => void;
}
