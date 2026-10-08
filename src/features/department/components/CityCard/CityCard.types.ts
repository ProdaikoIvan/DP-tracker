import type { City } from '../../types/department.types';

export interface CityCardProps {
  city: City;
  onClick: () => void;
}
