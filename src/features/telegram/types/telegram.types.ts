export type ConnectionStatus = 'idle' | 'waiting' | 'connected' | 'error';

export interface TelegramConfig {
  code: string | null;
  isConnected: boolean;
  isEnabled: boolean;
  workerUrl: string;
  botUsername: string;
}

export interface SendNotifyPayload {
  code: string;
  text: string;
  workerUrl: string;
}
