/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../services/storageService';
import { stopAllBadgeBlinking } from '../services/badgeService';
import {
  getStoredActiveTrackers,
  startTrackerSession,
  stopTrackerSession,
  updateTrackerTimestamp,
  handleFoundSlots,
} from '../services/trackingService';
import {
  SLOTS_STORAGE_KEY,
  NOTIFICATIONS_SOUND_KEY,
  ACTIVE_TRACKERS_KEY,
  TRACKER_ALARM_PREFIX,
} from '../constants/storage.constants';
import { openDepartmentTab, resolveInitialDepartment, ensureDepartmentTab } from '../services/tabService';
import { checkAvailableSlots } from '../services/slotService';
import type { SelectedDepartment, City, Country } from '../types/departments.types';
import type { ActiveTrackersMap, PollingInterval } from '../types/tracking.types';
import type {
  ServiceSlotsData,
  SlotsDataMap,
  SlotsContextValue,
  SlotsProviderProps,
} from './SlotsContext.types';

const SlotsContext = createContext<SlotsContextValue | null>(null);

const calculateTotalSlots = (map: SlotsDataMap): number =>
  Object.values(map).reduce((sum, item) => sum + item.slots.length, 0);

export const SlotsProvider: React.FC<SlotsProviderProps> = ({ children }) => {
  const [slotsMap, setSlotsMap] = useState<SlotsDataMap>({});
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [activeTrackers, setActiveTrackers] = useState<ActiveTrackersMap>({});
  const [selectedDepartment, setSelectedDepartment] = useState<SelectedDepartment | null>(null);

  useEffect(() => {
    void stopAllBadgeBlinking();
    void getItem<SlotsDataMap>(SLOTS_STORAGE_KEY).then((data) => data && setSlotsMap(data));
    void getItem<boolean>(NOTIFICATIONS_SOUND_KEY).then((val) => val !== null && setIsSoundEnabled(val));
    void getStoredActiveTrackers().then((trackers) => setActiveTrackers(trackers));
    void resolveInitialDepartment().then((dept) => dept && setSelectedDepartment(dept));

    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName !== 'local') return;
      if (changes[SLOTS_STORAGE_KEY]) {
        setSlotsMap((changes[SLOTS_STORAGE_KEY].newValue as SlotsDataMap) || {});
      }
      if (changes[ACTIVE_TRACKERS_KEY]) {
        setActiveTrackers((changes[ACTIVE_TRACKERS_KEY].newValue as ActiveTrackersMap) || {});
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

  const clearSlotsForService = async (cityName: string): Promise<void> => {
    if (!slotsMap[cityName]) return;
    const updatedMap = { ...slotsMap };
    delete updatedMap[cityName];
    setSlotsMap(updatedMap);
    await setItem(SLOTS_STORAGE_KEY, updatedMap);
  };

  const startCityTracker = async (city: City, country: Country, interval: PollingInterval): Promise<void> => {
    const tab = await ensureDepartmentTab(city.url);
    if (!tab?.id) return;

    await clearSlotsForService(city.name);
    const updated = await startTrackerSession(city, country.code, tab.id, interval);
    setActiveTrackers(updated);

    const slots = await checkAvailableSlots(tab.id);
    if (slots.length > 0) {
      await handleFoundSlots(city.name, tab.id, slots);
    }
  };

  const stopCityTracker = async (cityName: string): Promise<void> => {
    const updated = await stopTrackerSession(cityName);
    setActiveTrackers(updated);
  };

  const updateCityInterval = async (cityName: string, interval: PollingInterval): Promise<void> => {
    const current = activeTrackers[cityName];
    if (current) {
      await chrome.alarms.create(`${TRACKER_ALARM_PREFIX}${cityName}`, { periodInMinutes: interval });
      const nextCheck = Date.now() + interval * 60 * 1000;
      await updateTrackerTimestamp(cityName, nextCheck);
    }
  };

  const selectDepartment = (dept: SelectedDepartment | null): void => {
    setSelectedDepartment(dept);
    if (dept) void openDepartmentTab(dept.city.url);
  };

  const getServiceSlots = (cityName: string): ServiceSlotsData | undefined => slotsMap[cityName];

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
        activeTrackers,
        selectedDepartment,
        selectDepartment,
        toggleSound,
        startCityTracker,
        stopCityTracker,
        updateCityInterval,
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
