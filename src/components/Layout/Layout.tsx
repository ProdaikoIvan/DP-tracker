import React, { useState } from 'react';
import { Header } from '../Header';
import { ConfirmModal } from '../ConfirmModal';
import { ActiveTrackersList } from '@/features/tracker';
import { SlotsModal, AllSlotsList } from '@/features/slots';
import { useSlots } from '@/context/SlotsContext';
import type { LayoutProps } from './Layout.types';
import styles from './Layout.module.css';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  const {
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
    <div className={styles.container}>
      <Header
        onReset={handleOpenResetConfirm}
        onOpenStats={() => setIsStatsModalOpen(true)}
        servicesCount={servicesWithSlotsCount}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
      />

      <div className={styles.contentArea}>
        <main className={styles.mainContent}>{children}</main>

        <ActiveTrackersList
          activeTrackers={activeTrackers}
          onStopTracker={(cityName) => void stopCityTracker(cityName)}
        />
      </div>

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
    </div>
  );
};

export default Layout;
