import type { City, Country } from '../../types/departments.types';
import type { PollingInterval } from '../IntervalSelector/IntervalSelector.types';

export type { PollingInterval };

export interface TrackerViewProps {
  city: City;
  country: Country;
}
