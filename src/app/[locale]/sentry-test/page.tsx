'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // @ts-ignore
    unknownFunc();
  }, []);

  return <div>에러 페이지</div>;
}
