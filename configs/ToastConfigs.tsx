'use client';

import { createContext, useMemo, useState } from 'react';
import { notification } from 'antd';
import { GlobalConfigProps } from 'antd/es/notification/interface';

/** https://ant.design/components/notification */
const TOAST_CONFIG: GlobalConfigProps = {
  placement: 'topRight',
  duration: 2, //2초간 보여줌
  // rtl: true,
  // bottom: 50,
};

interface ToastConfigsProps {
  children: React.ReactNode;
}

export const ToastContext = createContext({ title: 'title', text: 'context' });

const ToastProvider = ({ children }: ToastConfigsProps) => {
  notification.config(TOAST_CONFIG);
  const contextValue = useMemo(() => ({ title: 'title', text: 'context' }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      <>{children}</>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
