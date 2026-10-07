import React, { useState } from 'react';
import { MapPin, Play, Pause, Eye } from 'lucide-react';
import IntervalSelector from '../IntervalSelector/IntervalSelector';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import { SlotsModal, SlotDetails } from '../SlotsModal';
import { getActiveTab } from '../../services/tabService';
import { checkAvailableSlots } from '../../services/slotService';
import { handleFoundSlots } from '../../services/trackingService';
import { useSlots } from '../../context/SlotsContext';
import type { TrackerViewProps } from './TrackerView.types';
import type { PollingInterval } from '../IntervalSelector/IntervalSelector.types';
import styles from './TrackerView.module.css';

const TrackerView: React.FC<TrackerViewProps> = ({ city }) => {
  const [selectedInterval, setSelectedInterval] = useState<PollingInterval>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    trackingState,
    startTracking,
    stopTracking,
    getServiceSlots,
    clearSlotsForService,
  } = useSlots();

  const isTracking = trackingState.isTracking && trackingState.cityName === city.name;
  const activeInterval = isTracking ? trackingState.intervalMinutes : selectedInterval;

  const serviceSlots = getServiceSlots(city.name);

  const toggleTracking = async () => {
    if (isTracking) {
      await stopTracking();
    } else {
      const tab = await getActiveTab();
      if (!tab?.id) return;

      await clearSlotsForService(city.name);
      await startTracking(city.name, tab.id, selectedInterval);

      const slots = await checkAvailableSlots(tab.id);
      if (slots.length > 0) {
        await handleFoundSlots(city.name, tab.id, slots);
      }
    }
  };

  const hasSlots = Boolean(serviceSlots && serviceSlots.slots.length > 0);
  const isStatusActive = hasSlots || isTracking;

  return (
    <div className={styles.container}>
      <div className={`${styles.serviceCard} ${isTracking ? styles.serviceCardActive : ''}`}>
        <div className={styles.serviceInfo}>
          <h2 className={styles.serviceTitle}>{city.name}</h2>
          <div className={styles.addressRow}>
            <MapPin size={16} className={styles.pinIcon} />
            <span>{city.address}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void toggleTracking()}
          className={`${styles.playPauseButton} ${isTracking ? styles.playPauseButtonActive : ''}`}
          aria-label={isTracking ? 'Призупинити відстеження' : 'Запустити відстеження'}
          title={isTracking ? 'Пауза' : 'Старт'}
        >
          {isTracking ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      <IntervalSelector
        value={activeInterval}
        onChange={(val) => {
          setSelectedInterval(val);
          if (isTracking && trackingState.tabId) {
            void startTracking(city.name, trackingState.tabId, val);
          }
        }}
      />

      <div className={styles.statusBar}>
        <div className={styles.statusIndicator}>
          <div className={isStatusActive ? styles.statusDotActive : styles.statusDotPaused} />
          <span className={isStatusActive ? styles.statusTextActive : styles.statusTextPaused}>
            {hasSlots
              ? 'Знайдено вільні дати!'
              : isTracking
                ? `Моніторинг активний (${activeInterval} хв)`
                : 'На паузі'}
          </span>
          {hasSlots && (
            <button
              type="button"
              className={styles.viewSlotsButton}
              onClick={() => setIsModalOpen(true)}
              title="Переглянути вільні дати"
            >
              <Eye size={13} />
              <span>Переглянути</span>
            </button>
          )}
        </div>

        <CountdownTimer
          key={isTracking ? (trackingState.nextCheckTimestamp ?? 'active') : activeInterval}
          isActive={isTracking}
          intervalMinutes={activeInterval}
          targetTimestamp={isTracking ? trackingState.nextCheckTimestamp : null}
        />
      </div>

      <SlotsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${city.name}: Вільні дати (${serviceSlots ? serviceSlots.slots.length : 0})`}
      >
        {serviceSlots && <SlotDetails {...serviceSlots} />}
      </SlotsModal>
    </div>
  );
};

export default TrackerView;
