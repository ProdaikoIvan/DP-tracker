import type { Country, SelectedDepartment } from '../../types/department.types';

export interface CountryServicesListProps {
  country: Country;
  onBack: () => void;
  onSelectDepartment: (dept: SelectedDepartment) => void;
}
