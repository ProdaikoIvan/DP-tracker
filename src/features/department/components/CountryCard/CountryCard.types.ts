import type { Country } from '../../types/department.types';

export interface CountryCardProps {
  country: Country;
  onClick?: () => void;
}
