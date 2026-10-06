import React, { useState } from 'react';
import { MapPin, Play, Pause, Eye } from 'lucide-react';
import IntervalSelector from '../IntervalSelector/IntervalSelector';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import { SlotsModal, SlotDetails } from '../SlotsModal';
import { getActiveTab } from '../../services/tabService';
import { checkAvailableSlots } from '../../services/slotService';
import { useSlots } from '../../context/SlotsContext';
import type { TrackerViewProps, PollingInterval } from './TrackerView.types';
import styles from './TrackerView.module.css';

const TrackerView: React.FC<TrackerViewProps> = ({ city }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<PollingInterval>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getServiceSlots, saveSlotsForService, clearSlotsForService } = useSlots();

  const serviceSlots = getServiceSlots(city.name);
  const foundSlots = serviceSlots?.slots ?? [];
  const foundAt = serviceSlots?.foundAt ?? '';

  const checkSlots = async () => {
    const tab = await getActiveTab();
    if (!tab?.id) return;

    const slots = await checkAvailableSlots(tab.id);
    if (slots.length > 0) {
      const now = new Date();
      const timestamp = `${now.toLocaleDateString('uk-UA')} о ${now.toLocaleTimeString('uk-UA')}`;
      setIsTracking(false);
      void saveSlotsForService(city.name, slots, timestamp);
    }
  };

  const toggleTracking = () => {
    const nextState = !isTracking;
    setIsTracking(nextState);

    if (nextState) {
      void clearSlotsForService(city.name);
      void checkSlots();
    }
  };

  const hasSlots = foundSlots.length > 0;

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
          onClick={toggleTracking}
          className={`${styles.playPauseButton} ${isTracking ? styles.playPauseButtonActive : ''}`}
          aria-label={isTracking ? 'Призупинити відстеження' : 'Запустити відстеження'}
          title={isTracking ? 'Пауза' : 'Старт'}
        >
          {isTracking ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      <IntervalSelector
        value={selectedInterval}
        onChange={setSelectedInterval}
      />

      <div className={styles.statusBar}>
        <div className={styles.statusIndicator}>
          <div className={hasSlots || isTracking ? styles.statusDotActive : styles.statusDotPaused} />
          <span className={hasSlots || isTracking ? styles.statusTextActive : styles.statusTextPaused}>
            {hasSlots
              ? 'Знайдено вільні дати!'
              : isTracking
                ? `Моніторинг активний (${selectedInterval} хв)`
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
          isActive={isTracking}
          intervalMinutes={selectedInterval}
        />
      </div>

      <SlotsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${city.name}: Вільні дати (${foundSlots.length})`}
      >
        <SlotDetails
          cityName={city.name}
          foundAt={foundAt}
          slots={foundSlots}
        />
      </SlotsModal>
    </div>
  );
};

export default TrackerView;
