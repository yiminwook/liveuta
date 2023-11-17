'use client';
'use client';
import { DevTools } from 'jotai-devtools';

const Devtools = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <DevTools theme="dark" />
    </>
  );
};

export default Devtools;
