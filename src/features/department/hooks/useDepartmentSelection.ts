import { useState, useEffect } from 'react';
import { detectCurrentDepartment, openDepartmentTab } from '../services/departmentService';
import type { SelectedDepartment } from '../types/department.types';
import type { UseDepartmentSelectionResult } from './useDepartmentSelection.types';

export const useDepartmentSelection = (): UseDepartmentSelectionResult => {
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(null);

  useEffect(() => {
    void detectCurrentDepartment().then((dept) => {
      if (dept) {
        setSelectedDepartment(dept);
      }
    });
  }, []);

  const selectDepartment = (dept: SelectedDepartment | null): void => {
    setSelectedDepartment(dept);
    if (dept) {
      void openDepartmentTab(dept.city.url);
    }
  };

  return {
    selectedDepartment,
    selectDepartment,
  };
};
