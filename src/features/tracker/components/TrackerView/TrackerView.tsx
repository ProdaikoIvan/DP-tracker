import React, { useState } from 'react';
import { NavigationHeader } from '@/components';
import { TrackerControls } from '../TrackerControls';
import { TrackerStatusBar } from '../TrackerStatusBar';
import { SlotsModal, SlotDetails, useSlots } from '@/features/slots';
import { useActiveTrackers } from '../../hooks/useActiveTrackers';
import { startTracker, stopTracker, updateTrackerInterval } from '../../services/trackingService';
import type { TrackerViewProps } from './TrackerView.types';
import type { PollingInterval } from '../../types/tracker.types';
import styles from './TrackerView.module.css';

const TrackerView: React.FC<TrackerViewProps> = ({ city, country, onBack }) => {
  const [selectedInterval, setSelectedInterval] = useState<PollingInterval>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const activeTrackers = useActiveTrackers();
  const { slotsMap } = useSlots();

  const currentTracker = activeTrackers[city.name];
  const isTracking = Boolean(currentTracker);
  const activeInterval = currentTracker ? currentTracker.intervalMinutes : selectedInterval;

  const serviceSlots = slotsMap[city.name];
  const hasSlots = Boolean(serviceSlots && serviceSlots.slots.length > 0);

  const handleToggleTracking = async () => {
    setHasError(false);
    if (isTracking) {
      await stopTracker(city.name);
    } else {
      try {
        const isStarted = await startTracker(city, country.code, selectedInterval);
        if (!isStarted) {
          setHasError(true);
        }
      } catch {
        setHasError(true);
      }
    }
  };

  const handleIntervalChange = (val: PollingInterval) => {
    setSelectedInterval(val);
    setHasError(false);
    if (isTracking) {
      void updateTrackerInterval(city.name, val);
    }
  };

  return (
    <div className={styles.container}>
      <NavigationHeader
        onBack={onBack}
        countryCode={country.code}
        title={city.name}
        subtitle={city.address}
      />

      <div className={styles.content}>
        <TrackerControls
          interval={activeInterval}
          onIntervalChange={handleIntervalChange}
          isTracking={isTracking}
          onToggleTracking={handleToggleTracking}
        />

        <TrackerStatusBar
          isTracking={isTracking}
          hasSlots={hasSlots}
          intervalMinutes={activeInterval}
          nextCheckTimestamp={currentTracker ? currentTracker.nextCheckTimestamp : null}
          hasError={hasError && !isTracking}
          onViewSlots={() => setIsModalOpen(true)}
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
