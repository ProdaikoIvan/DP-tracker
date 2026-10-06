import type { SelectedDepartment } from '../../types/departments.types';

export interface DepartmentsListProps {
  onSelectDepartment: (dept: SelectedDepartment) => void;
}
