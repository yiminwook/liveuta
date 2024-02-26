'use client';
import { login } from '@/app/_lib/auth';

export default function Page() {
  return (
    <div>
      <h1>로그인</h1>
      <button onClick={() => login()}>로그인</button>
    </div>
  );
}
