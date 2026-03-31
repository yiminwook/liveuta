'use client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Devtools() {
  return (
    <>
      <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
    </>
  );
}
