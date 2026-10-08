import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { ActiveTrackerItem } from './components/ActiveTrackerItem';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import type { ActiveTrackersListProps } from './ActiveTrackersList.types';
import styles from './ActiveTrackersList.module.css';

const ActiveTrackersList: React.FC<ActiveTrackersListProps> = ({
  activeTrackers,
  onStopTracker,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cityToStop, setCityToStop] = useState<string | null>(null);

  const trackerEntries = Object.values(activeTrackers);

  if (trackerEntries.length === 0) {
    return null;
  }

  const handleConfirmStop = () => {
    if (cityToStop) {
      onStopTracker(cityToStop);
      setCityToStop(null);
    }
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isExpanded ? styles.backdropVisible : ''}`}
        onClick={() => setIsExpanded(false)}
      />

      <aside className={`${styles.sheet} ${isExpanded ? styles.sheetExpanded : ''}`}>
        <button
          type="button"
          className={styles.header}
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <div className={styles.headerLeft}>
            <span className={styles.pulsingDot} />
            <span className={styles.headerTitle}>Активні відстеження</span>
            <span className={styles.badge}>{trackerEntries.length}</span>
          </div>

          <div className={styles.headerRight}>
            <ChevronUp
              size={16}
              className={`${styles.chevron} ${isExpanded ? styles.chevronRotated : ''}`}
            />
          </div>
        </button>

        <div className={`${styles.listContainer} ${isExpanded ? styles.listContainerExpanded : ''}`}>
          <div className={styles.listInner}>
            <div className={styles.list}>
              {trackerEntries.map((tracker) => (
                <ActiveTrackerItem
                  key={tracker.cityName}
                  tracker={tracker}
                  onStop={() => setCityToStop(tracker.cityName)}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      <ConfirmModal
        isOpen={cityToStop !== null}
        title="Зупинити відстеження?"
        message={`Ви впевнені, що хочете зупинити відстеження для міста ${cityToStop || ''}?`}
        confirmText="Так"
        cancelText="Ні"
        onConfirm={handleConfirmStop}
        onCancel={() => setCityToStop(null)}
      />
    </>
  );
};

export default ActiveTrackersList;
