import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import DepartmentsList from '../../components/DepartmentsList/DepartmentsList';
import TrackerView from '../../components/TrackerView/TrackerView';
import { SlotsModal, AllSlotsList } from '../../components/SlotsModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { detectCurrentDepartment, openDepartmentTab } from '../../services/tabService';
import { useSlots } from '../../context/SlotsContext';
import type { SelectedDepartment } from '../../types/departments.types';
import type { MainPageProps } from './MainPage.types';

const MainPage: React.FC<MainPageProps> = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(null);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const { slotsMap, totalSlots, clearAllSlots } = useSlots();

  const handleSelectDepartment = (dept: SelectedDepartment) => {
    setSelectedDepartment(dept);
    void openDepartmentTab(dept.city.url);
  };

  const handleReset = async () => {
    await clearAllSlots();
    const dept = await detectCurrentDepartment();
    setSelectedDepartment(dept);
  };

  const handleResetClick = () => {
    if (totalSlots > 0) {
      setIsResetConfirmOpen(true);
    } else {
      void handleReset();
    }
  };

  const handleConfirmReset = async () => {
    setIsResetConfirmOpen(false);
    await handleReset();
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
        onReset={handleResetClick}
        onOpenStats={() => setIsStatsModalOpen(true)}
        hasSlots={totalSlots > 0}
      />
      <main className="main-content">
        {selectedDepartment ? (
          <TrackerView city={selectedDepartment.city} />
        ) : (
          <DepartmentsList onSelectDepartment={handleSelectDepartment} />
        )}
      </main>

      <SlotsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        title="Статистика вільних дат"
      >
        <AllSlotsList slotsMap={slotsMap} />
      </SlotsModal>

      <ConfirmModal
        isOpen={isResetConfirmOpen}
        title="Скинути дані?"
        message="Ви впевнені, що хочете видалити всі знайдені слоти?"
        confirmText="Так"
        cancelText="Ні"
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};

export default MainPage;
