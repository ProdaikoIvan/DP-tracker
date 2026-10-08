import type { SelectedDepartment } from '../../types/department.types';

export interface DepartmentsListProps {
  onSelectDepartment: (dept: SelectedDepartment) => void;
}
