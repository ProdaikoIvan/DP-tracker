import React, { useState } from 'react';
import NavigationHeader from '../NavigationHeader/NavigationHeader';
import TrackerControls from '../TrackerControls/TrackerControls';
import TrackerStatusBar from '../TrackerStatusBar/TrackerStatusBar';
import { SlotsModal, SlotDetails } from '../SlotsModal';
import { useSlots } from '../../context/SlotsContext';
import type { TrackerViewProps } from './TrackerView.types';
import type { PollingInterval } from '../../types/tracking.types';
import styles from './TrackerView.module.css';

const TrackerView: React.FC<TrackerViewProps> = ({ city, country, onBack }) => {
  const [selectedInterval, setSelectedInterval] = useState<PollingInterval>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    activeTrackers,
    startCityTracker,
    stopCityTracker,
    updateCityInterval,
    getServiceSlots,
  } = useSlots();

  const currentTracker = activeTrackers[city.name];
  const isTracking = Boolean(currentTracker);
  const activeInterval = currentTracker ? currentTracker.intervalMinutes : selectedInterval;

  const serviceSlots = getServiceSlots(city.name);
  const hasSlots = Boolean(serviceSlots && serviceSlots.slots.length > 0);

  const handleToggleTracking = () => {
    if (isTracking) {
      void stopCityTracker(city.name);
    } else {
      void startCityTracker(city, country, selectedInterval);
    }
  };

  const handleIntervalChange = (val: PollingInterval) => {
    setSelectedInterval(val);
    if (isTracking) {
      void updateCityInterval(city.name, val);
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
