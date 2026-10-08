import React, { useState } from 'react';
import { Layout, Header, ConfirmModal } from '@/components';
import { DepartmentsList } from '@/features/department';
import { TrackerView, ActiveTrackersList } from '@/features/tracker';
import { SlotsModal, AllSlotsList } from '@/features/slots';
import { useSlots } from '@/context/SlotsContext';
import type { ConfirmModalConfig } from './MainPage.types';

const MainPage: React.FC = () => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmModalConfig | null>(null);

  const {
    selectedDepartment,
    selectDepartment,
    servicesWithSlotsCount,
    isSoundEnabled,
    toggleSound,
    clearAllSlots,
    clearSlotsForService,
    slotsMap,
    activeTrackers,
    stopCityTracker,
  } = useSlots();

  const handleOpenResetConfirm = () => {
    setConfirmConfig({
      title: 'Скинути дані?',
      message: 'Ви впевнені, що хочете видалити всі знайдені слоти?',
      onConfirm: async () => {
        setConfirmConfig(null);
        await clearAllSlots();
      },
    });
  };

  const handleOpenDeleteCityConfirm = (cityName: string) => {
    setConfirmConfig({
      title: 'Видалити знайдені дати?',
      message: `Ви впевнені, що хочете видалити знайдені дати для міста ${cityName}?`,
      onConfirm: async () => {
        setConfirmConfig(null);
        await clearSlotsForService(cityName);
      },
    });
  };

  return (
    <Layout
      header={
        <Header
          onReset={handleOpenResetConfirm}
          onOpenStats={() => setIsStatsModalOpen(true)}
          servicesCount={servicesWithSlotsCount}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={toggleSound}
        />
      }
      footer={
        <ActiveTrackersList
          activeTrackers={activeTrackers}
          onStopTracker={(cityName) => void stopCityTracker(cityName)}
        />
      }
      modals={
        <>
          <SlotsModal
            isOpen={isStatsModalOpen}
            onClose={() => setIsStatsModalOpen(false)}
            title="Статистика вільних дат"
          >
            <AllSlotsList
              slotsMap={slotsMap}
              onDeleteSlot={handleOpenDeleteCityConfirm}
            />
          </SlotsModal>

          <ConfirmModal
            isOpen={Boolean(confirmConfig)}
            title={confirmConfig?.title || ''}
            message={confirmConfig?.message || ''}
            confirmText="Так"
            cancelText="Ні"
            onConfirm={() => void confirmConfig?.onConfirm()}
            onCancel={() => setConfirmConfig(null)}
          />
        </>
      }
    >
      {selectedDepartment ? (
        <TrackerView
          city={selectedDepartment.city}
          country={selectedDepartment.country}
          onBack={() => selectDepartment(null)}
        />
      ) : (
        <DepartmentsList onSelectDepartment={selectDepartment} />
      )}
    </Layout>
  );
};

export default MainPage;
