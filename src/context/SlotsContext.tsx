import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../services/storageService';
import { stopAllBadgeBlinking } from '../services/badgeService';
import {
  initialTrackingState,
  getStoredTrackingState,
  startTrackingSession,
  stopTrackingSession,
} from '../services/trackingService';
import {
  SLOTS_STORAGE_KEY,
  NOTIFICATIONS_SOUND_KEY,
  TRACKING_STATE_KEY,
} from '../constants/storage.constants';
import { openDepartmentTab, resolveInitialDepartment } from '../services/tabService';
import type { SelectedDepartment } from '../types/departments.types';
import type { TrackingState } from '../types/tracking.types';
import type { PollingInterval } from '../components/IntervalSelector/IntervalSelector.types';
import type {
  ServiceSlotsData,
  SlotsDataMap,
  SlotsContextValue,
  SlotsProviderProps,
} from './SlotsContext.types';

const SlotsContext = createContext<SlotsContextValue | null>(null);

export const calculateTotalSlots = (map: SlotsDataMap): number =>
  Object.values(map).reduce((sum, item) => sum + item.slots.length, 0);

export const SlotsProvider: React.FC<SlotsProviderProps> = ({ children }) => {
  const [slotsMap, setSlotsMap] = useState<SlotsDataMap>({});
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [trackingState, setTrackingState] = useState<TrackingState>(initialTrackingState);
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(null);

  useEffect(() => {
    void stopAllBadgeBlinking();

    void getItem<SlotsDataMap>(SLOTS_STORAGE_KEY).then((data) => {
      if (data) {
        setSlotsMap(data);
      }
    });
    void getItem<boolean>(NOTIFICATIONS_SOUND_KEY).then((enabled) => {
      if (enabled !== null) setIsSoundEnabled(enabled);
    });
    void getStoredTrackingState().then((state) => {
      setTrackingState(state);
      void resolveInitialDepartment(state).then((dept) => {
        if (dept) setSelectedDepartment(dept);
      });
    });

    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName !== 'local') return;
      if (changes[SLOTS_STORAGE_KEY]) {
        const newMap = (changes[SLOTS_STORAGE_KEY].newValue as SlotsDataMap) || {};
        setSlotsMap(newMap);
      }
      if (changes[TRACKING_STATE_KEY]) {
        setTrackingState((changes[TRACKING_STATE_KEY].newValue as TrackingState) || initialTrackingState);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  const toggleSound = async (): Promise<void> => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    await setItem(NOTIFICATIONS_SOUND_KEY, nextState);
  };

  const startTracking = async (cityName: string, tabId: number, interval: PollingInterval): Promise<void> => {
    const newState = await startTrackingSession(cityName, tabId, interval);
    setTrackingState(newState);
  };

  const stopTracking = async (): Promise<void> => {
    const newState = await stopTrackingSession(trackingState);
    setTrackingState(newState);
  };

  const selectDepartment = (dept: SelectedDepartment | null): void => {
    setSelectedDepartment(dept);
    if (dept) void openDepartmentTab(dept.city.url);
  };

  const getServiceSlots = (cityName: string): ServiceSlotsData | undefined => slotsMap[cityName];

  const clearSlotsForService = async (cityName: string): Promise<void> => {
    if (!slotsMap[cityName]) return;
    const updatedMap = { ...slotsMap };
    delete updatedMap[cityName];
    setSlotsMap(updatedMap);
    await setItem(SLOTS_STORAGE_KEY, updatedMap);
  };

  const clearAllSlots = async (): Promise<void> => {
    setSlotsMap({});
    await removeItem(SLOTS_STORAGE_KEY);
    void stopAllBadgeBlinking();
  };

  const totalSlots = calculateTotalSlots(slotsMap);

  return (
    <SlotsContext.Provider
      value={{
        slotsMap,
        totalSlots,
        isSoundEnabled,
        trackingState,
        selectedDepartment,
        selectDepartment,
        toggleSound,
        startTracking,
        stopTracking,
        getServiceSlots,
        clearSlotsForService,
        clearAllSlots,
      }}
    >
      {children}
    </SlotsContext.Provider>
  );
};

export const useSlots = (): SlotsContextValue => {
  const context = useContext(SlotsContext);
  if (!context) throw new Error('useSlots must be used within a SlotsProvider');
  return context;
};
