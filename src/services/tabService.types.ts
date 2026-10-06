import type { SelectedDepartment } from '../types/departments.types';

export interface TabMatchResult {
  department: SelectedDepartment;
  tabId?: number;
}
