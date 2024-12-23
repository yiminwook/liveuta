'use client';
import { Toaster } from 'sonner';
import css from './ToastBox.module.scss';

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
        className: css.toast,
      }}
    />
  );
}
