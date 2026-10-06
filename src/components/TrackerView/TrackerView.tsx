import React, { useState } from 'react';
import { MapPin, Play, Pause, ExternalLink } from 'lucide-react';
import IntervalSelector from '../IntervalSelector/IntervalSelector';
import type { TrackerViewProps, PollingInterval } from './TrackerView.types';
import styles from './TrackerView.module.css';

const TrackerView: React.FC<TrackerViewProps> = ({ city, country }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<PollingInterval>(1);

  const toggleTracking = () => {
    setIsTracking((prev) => !prev);
  };

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
          <div className={isTracking ? styles.statusDotActive : styles.statusDotPaused} />
          <span className={isTracking ? styles.statusTextActive : styles.statusTextPaused}>
            {isTracking ? `Моніторинг активний (${selectedInterval} хв)` : 'На паузі'}
          </span>
        </div>

        <a
          href={city.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
        >
          <span>Сайт запису</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default TrackerView;
