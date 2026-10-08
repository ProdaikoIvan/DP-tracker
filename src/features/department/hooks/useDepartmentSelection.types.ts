import type { SelectedDepartment } from '../types/department.types';

export interface UseDepartmentSelectionResult {
  selectedDepartment: SelectedDepartment | null;
  selectDepartment: (dept: SelectedDepartment | null) => void;
}
