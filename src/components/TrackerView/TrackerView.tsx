import React, { useState } from 'react';
import { MapPin, Play, Pause } from 'lucide-react';
import IntervalSelector from '../IntervalSelector/IntervalSelector';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import { getActiveTab } from '../../services/tabService';
import { checkAvailableSlots } from '../../services/slotService';
import type { SlotDay } from '../../services/slotService.types';
import type { TrackerViewProps, PollingInterval } from './TrackerView.types';
import styles from './TrackerView.module.css';

const TrackerView: React.FC<TrackerViewProps> = ({ city, country }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<PollingInterval>(1);
  const [foundSlots, setFoundSlots] = useState<SlotDay[]>([]);

  const checkSlots = async () => {
    const tab = await getActiveTab();
    if (!tab?.id) return;

    const slots = await checkAvailableSlots(tab.id);
    if (slots.length > 0) {
      setFoundSlots(slots);
      setIsTracking(false);
    }
  };

  const toggleTracking = () => {
    const nextState = !isTracking;
    setIsTracking(nextState);

    if (nextState) {
      setFoundSlots([]);
      void checkSlots();
    }
  };

  const hasSlots = foundSlots.length > 0;

  return (
    <div className={styles.container}>
      <div className={`${styles.serviceCard} ${isTracking ? styles.serviceCardActive : ''}`}>
        <div className={styles.serviceInfo}>
          <div className={styles.countryBadge}>
            <span>{country.flag}</span>
            <span>{country.name}</span>
          </div>

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
        </div>

        <CountdownTimer
          isActive={isTracking}
          intervalMinutes={selectedInterval}
        />
      </div>
    </div>
  );
};

export default TrackerView;
