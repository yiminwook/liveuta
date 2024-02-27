'use client';
import { PropsWithChildren } from 'react';
import { ConfigProvider, App } from 'antd';

export default function Antd({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <App
        style={{
          color: 'inherit',
          lineHeight: 'inherit',
          fontFamily: 'inherit',
        }}
        notification={{
          maxCount: 3,
          placement: 'topRight',
          stack: {
            threshold: 2,
          },
          // top: global.scss에서 important로 스타일 변경중 .ant-notification-stack
        }}
      >
        {children}
      </App>
    </ConfigProvider>
  );
}
