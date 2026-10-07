import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import DepartmentsList from '../../components/DepartmentsList/DepartmentsList';
import TrackerView from '../../components/TrackerView/TrackerView';
import { SlotsModal, AllSlotsList } from '../../components/SlotsModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { useSlots } from '../../context/SlotsContext';

const MainPage: React.FC = () => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const {
    selectedDepartment,
    selectDepartment,
    clearAllSlots,
    slotsMap,
    totalSlots,
    isSoundEnabled,
    toggleSound,
  } = useSlots();

  const handleConfirmReset = async () => {
    setIsResetConfirmOpen(false);
    await clearAllSlots();
  };

  return (
    <div className="app-container">
      <Header
        showBackButton={!!selectedDepartment}
        onBack={() => selectDepartment(null)}
        onReset={() => setIsResetConfirmOpen(true)}
        onOpenStats={() => setIsStatsModalOpen(true)}
        slotsCount={totalSlots}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
      />
      <main className="main-content">
        {selectedDepartment ? (
          <TrackerView city={selectedDepartment.city} />
        ) : (
          <DepartmentsList onSelectDepartment={selectDepartment} />
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
