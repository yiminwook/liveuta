'use client';
import { PropsWithChildren } from 'react';
import { ConfigProvider, App } from 'antd';

const AntdProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <App
        notification={{
          maxCount: 3,
          placement: 'topRight',
          // top: global.scss에서 important로 변경중 .ant-notification-stack
        }}
      >
        {children}
      </App>
    </ConfigProvider>
  );
};

export default AntdProvider;
