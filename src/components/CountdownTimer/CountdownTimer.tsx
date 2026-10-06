import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import type { CountdownTimerProps } from './CountdownTimer.types';
import styles from './CountdownTimer.module.css';

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ isActive, intervalMinutes }) => {
  const [timeLeft, setTimeLeft] = useState<number>(intervalMinutes * 60);

  useEffect(() => {
    setTimeLeft(intervalMinutes * 60);
  }, [intervalMinutes, isActive]);

  useEffect(() => {
    if (!isActive) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return intervalMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive, intervalMinutes]);

  return (
    <div className={`${styles.timerContainer} ${isActive ? styles.timerActive : ''}`}>
      <Timer
        size={15}
        className={isActive ? styles.timerIconActive : styles.timerIcon}
      />
      <span className={styles.timeText}>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default CountdownTimer;
