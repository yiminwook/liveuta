'use client';
import { PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import theme from '@/configs/ThemeConfig';
import AntdRegistry from '@/configs/AntdRegistry';
import ToastProvider from '@/configs/ToastConfigs';

const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <ToastProvider>{children}</ToastProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
