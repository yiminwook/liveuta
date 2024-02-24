'use client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools } from 'jotai-devtools';

export default function Devtools() {
  return null;
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <DevTools theme="dark" />
      <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
    </>
  );
}
