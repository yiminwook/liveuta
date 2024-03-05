'use client';
import { Toaster } from 'sonner';
import * as styles from './toastBox.css';

export default function ToastBox() {
  return (
    <Toaster
      position="top-right"
      visibleToasts={3}
      closeButton
      theme="light"
      duration={1200}
      icons={{
        success: '✅',
        info: 'ℹ️',
        warning: '⚠️',
        error: '❌',
        loading: '⏳',
      }}
      toastOptions={{
        className: styles.toast,
      }}
    />
  );
}
