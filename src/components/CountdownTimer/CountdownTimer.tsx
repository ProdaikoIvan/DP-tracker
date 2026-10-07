import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import type { CountdownTimerProps } from './CountdownTimer.types';
import styles from './CountdownTimer.module.css';

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const getRemainingSeconds = (intervalMinutes: number, targetTimestamp?: number | null): number => {
  if (targetTimestamp && targetTimestamp > Date.now()) {
    return Math.max(0, Math.round((targetTimestamp - Date.now()) / 1000));
  }
  return intervalMinutes * 60;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  isActive,
  intervalMinutes,
  targetTimestamp,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(() =>
    getRemainingSeconds(intervalMinutes, targetTimestamp)
  );

  useEffect(() => {
    if (!isActive) return;

    const timerId = setInterval(() => {
      setTimeLeft(getRemainingSeconds(intervalMinutes, targetTimestamp));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive, intervalMinutes, targetTimestamp]);

  const displayTime = isActive ? timeLeft : intervalMinutes * 60;

  return (
    <div className={`${styles.timerContainer} ${isActive ? styles.timerActive : ''}`}>
      <Timer
        size={15}
        className={isActive ? styles.timerIconActive : styles.timerIcon}
      />
      <span className={styles.timeText}>{formatTime(displayTime)}</span>
    </div>
  );
};

export default CountdownTimer;
