import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import DepartmentsList from '../../components/DepartmentsList/DepartmentsList';
import TrackerView from '../../components/TrackerView/TrackerView';
import { detectCurrentDepartment, openDepartmentTab } from '../../services/tabService';
import { useSlots } from '../../context/SlotsContext';
import type { SelectedDepartment } from '../../types/departments.types';
import type { MainPageProps } from './MainPage.types';

const MainPage: React.FC<MainPageProps> = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(null);
  const { clearSlots } = useSlots();

  const handleSelectDepartment = (dept: SelectedDepartment) => {
    setSelectedDepartment(dept);
    void openDepartmentTab(dept.city.url);
  };

  const handleRefresh = async () => {
    await clearSlots();
    const dept = await detectCurrentDepartment();
    setSelectedDepartment(dept);
  };

  useEffect(() => {
    let isMounted = true;

    detectCurrentDepartment().then((dept) => {
      if (isMounted && dept) {
        setSelectedDepartment(dept);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="app-container">
      <Header
        showBackButton={!!selectedDepartment}
        onBack={() => setSelectedDepartment(null)}
        onRefresh={handleRefresh}
      />
      <main className="main-content">
        {selectedDepartment ? (
          <TrackerView
            city={selectedDepartment.city}
            country={selectedDepartment.country}
          />
        ) : (
          <DepartmentsList onSelectDepartment={handleSelectDepartment} />
        )}
      </main>
    </div>
  );
};

export default MainPage;
