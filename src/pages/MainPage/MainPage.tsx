import React, { useState, useEffect } from 'react';
import { Layout, Header, ConfirmModal } from '@/components';
import { useStorage } from '@/hooks';
import { stopAllBadgeBlinking } from '@/services/badgeService';
import { NOTIFICATIONS_SOUND_KEY } from '@/constants/storage.constants';
import { DepartmentsList, useDepartmentSelection } from '@/features/department';
import { TrackerView, ActiveTrackersList, useActiveTrackers, stopTracker } from '@/features/tracker';
import { SlotsModal, AllSlotsList, useSlots, clearAllSlotsData, clearSlotsForCity } from '@/features/slots';
import { SettingsModal } from '@/features/settings';
import type { ConfirmModalConfig } from './MainPage.types';

const MainPage: React.FC = () => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmModalConfig | null>(null);

  const { selectedDepartment, selectDepartment } = useDepartmentSelection();
  const { slotsMap, servicesWithSlotsCount } = useSlots();
  const activeTrackers = useActiveTrackers();
  const [isSoundEnabled, setIsSoundEnabled] = useStorage<boolean>(NOTIFICATIONS_SOUND_KEY, true);

  useEffect(() => {
    void stopAllBadgeBlinking();
  }, []);

  const handleToggleSound = () => {
    void setIsSoundEnabled((prev) => !prev);
  };

  const handleOpenResetConfirm = () => {
    setConfirmConfig({
      title: 'Скинути дані?',
      message: 'Ви впевнені, що хочете видалити всі знайдені слоти?',
      onConfirm: async () => {
        setConfirmConfig(null);
        await clearAllSlotsData();
      },
    });
  };

  const handleOpenDeleteCityConfirm = (cityName: string) => {
    setConfirmConfig({
      title: 'Видалити знайдені дати?',
      message: `Ви впевнені, що хочете видалити знайдені дати для міста ${cityName}?`,
      onConfirm: async () => {
        setConfirmConfig(null);
        await clearSlotsForCity(cityName);
      },
    });
  };

  return (
    <Layout
      header={
        <Header
          onReset={handleOpenResetConfirm}
          onOpenStats={() => setIsStatsModalOpen(true)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          servicesCount={servicesWithSlotsCount}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
        />
      }
      footer={
        <ActiveTrackersList
          activeTrackers={activeTrackers}
          onStopTracker={(cityName) => void stopTracker(cityName)}
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

          <SettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
          />

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
