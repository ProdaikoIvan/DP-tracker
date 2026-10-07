import type { Country, SelectedDepartment } from '../../types/departments.types';

export interface CountryServicesListProps {
  country: Country;
  onBack: () => void;
  onSelectDepartment: (dept: SelectedDepartment) => void;
}
