import React, { useState } from 'react';
import Header from '../Header/Header';
import { ActiveTrackersList } from '../ActiveTrackersList';
import { SlotsModal, AllSlotsList } from '../SlotsModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useSlots } from '../../context/SlotsContext';
import type { LayoutProps } from './Layout.types';
import styles from './Layout.module.css';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [cityToDeleteSlots, setCityToDeleteSlots] = useState<string | null>(null);

  const {
    totalSlots,
    isSoundEnabled,
    toggleSound,
    clearAllSlots,
    clearSlotsForService,
    slotsMap,
    activeTrackers,
    stopCityTracker,
  } = useSlots();

  const handleConfirmReset = async () => {
    setIsResetConfirmOpen(false);
    await clearAllSlots();
  };

  const handleConfirmDeleteCitySlots = async () => {
    if (cityToDeleteSlots) {
      await clearSlotsForService(cityToDeleteSlots);
      setCityToDeleteSlots(null);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        onReset={() => setIsResetConfirmOpen(true)}
        onOpenStats={() => setIsStatsModalOpen(true)}
        slotsCount={totalSlots}
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
          onDeleteSlot={(cityName) => setCityToDeleteSlots(cityName)}
        />
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

      <ConfirmModal
        isOpen={cityToDeleteSlots !== null}
        title="Видалити знайдені дати?"
        message={`Ви впевнені, що хочете видалити знайдені дати для міста ${cityToDeleteSlots || ''}?`}
        confirmText="Так"
        cancelText="Ні"
        onConfirm={handleConfirmDeleteCitySlots}
        onCancel={() => setCityToDeleteSlots(null)}
      />
    </div>
  );
};

export default Layout;
