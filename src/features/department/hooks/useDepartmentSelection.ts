import { useState, useEffect } from 'react';
import { findDepartmentByUrl } from '../services/departmentService';
import { getActiveTabUrl, openTabWithUrl } from '@/utils/browserTabs';
import type { SelectedDepartment } from '../types/department.types';
import type { UseDepartmentSelectionResult } from './useDepartmentSelection.types';

export const useDepartmentSelection = (): UseDepartmentSelectionResult => {
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(null);

  useEffect(() => {
    void getActiveTabUrl().then((url) => {
      if (url) {
        const dept = findDepartmentByUrl(url);
        if (dept) setSelectedDepartment(dept);
      }
    });
  }, []);

  const selectDepartment = (dept: SelectedDepartment | null): void => {
    setSelectedDepartment(dept);
    if (dept) {
      void openTabWithUrl(dept.city.url);
    }
  };

  return {
    selectedDepartment,
    selectDepartment,
  };
};
