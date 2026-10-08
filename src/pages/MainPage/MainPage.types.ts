export interface ConfirmModalConfig {
  title: string;
  message: string;
  onConfirm: () => Promise<void> | void;
}
