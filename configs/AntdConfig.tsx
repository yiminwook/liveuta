'use client';
import theme from '@/configs/ThemeConfig';
import { ConfigProvider } from 'antd';
import AntdRegistry from '@/configs/AntdRegistry';
import { PropsWithChildren } from 'react';

const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
