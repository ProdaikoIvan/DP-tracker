import type { City } from '../../types/departments.types';

export interface CityCardProps {
  city: City;
  onClick: () => void;
}
