import { useState, useEffect, useRef } from 'react';
import { useStorage } from '@/hooks';
import {
  generateConnectionCode,
  checkConnectionStatus,
  sendTestNotification,
  disconnectTelegram,
} from '../services/telegramService';
import type { TelegramConfig, ConnectionStatus } from '../types/telegram.types';
import { TELEGRAM_CONFIG_STORAGE_KEY, DEFAULT_TELEGRAM_CONFIG } from '../constants/telegram.constants';

export const useTelegram = () => {
  const [config, setConfig] = useStorage<TelegramConfig>(
    TELEGRAM_CONFIG_STORAGE_KEY,
    DEFAULT_TELEGRAM_CONFIG
  );
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const pollTimerRef = useRef<number | null>(null);

  const isPending = Boolean(!config.isConnected && config.code);
  const status: ConnectionStatus = config.isConnected
    ? 'connected'
    : isPending
      ? 'waiting'
      : 'idle';

  useEffect(() => {
    const code = config.code;
    if (!isPending || !code) return;

    const runCheck = async () => {
      const isConnected = await checkConnectionStatus(code, config.workerUrl);
      if (isConnected) {
        if (pollTimerRef.current) clearInterval(pollTimerRef.current);
        await setConfig((prev) => ({
          ...prev,
          isConnected: true,
          isEnabled: true,
        }));
      }
    };

    void runCheck();
    pollTimerRef.current = window.setInterval(runCheck, 2000);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isPending, config.code, config.workerUrl, setConfig]);

  const startConnect = async () => {
    const code = generateConnectionCode();
    await setConfig((prev) => ({
      ...prev,
      code,
      isConnected: false,
    }));
    const botUrl = `https://t.me/${config.botUsername}?start=${code}`;
    window.open(botUrl, '_blank');
  };

  const cancelConnect = async () => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    await setConfig((prev) => ({ ...prev, code: null }));
  };

  const handleDisconnect = async () => {
    await disconnectTelegram();
  };

  const toggleEnabled = async () => {
    await setConfig((prev) => ({ ...prev, isEnabled: !prev.isEnabled }));
  };

  const handleSendTest = async () => {
    setTestStatus('sending');
    const success = await sendTestNotification();
    setTestStatus(success ? 'success' : 'error');
    setTimeout(() => setTestStatus('idle'), 3000);
  };

  return {
    config,
    status,
    testStatus,
    startConnect,
    cancelConnect,
    disconnect: handleDisconnect,
    toggleEnabled,
    sendTest: handleSendTest,
  };
};
