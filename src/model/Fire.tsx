//에러테스트용

'use client';
import { useState } from 'react';

export const typeErrorAPI = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`);
  const data = await res.json();
  return data.map(() => '');
};

export default function Fire() {
  const [fire, setFire] = useState(false);

  if (fire) throw new Error('에러테스트!!!');

  return <div onClick={() => setFire(true)}>에러발생</div>;
}
