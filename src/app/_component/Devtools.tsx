'use client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools } from 'jotai-devtools';

const Devtools = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <DevTools theme="dark" />
      <ReactQueryDevtools buttonPosition="bottom-right" position="right" />
    </>
  );
};

export default Devtools;
