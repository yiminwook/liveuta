'use client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Devtools() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return null;
  }

  return (
    <>
      <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
    </>
  );
}
