'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import * as styles from './nav.css';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import { BREAK_POINT } from '@/style/var';

export default function Nav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = useState(searchParams.get('q') || '');
  const isMobile = useMediaQuery({ query: `(max-width: ${BREAK_POINT.sm}px)` });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    router.push(`/channels?q=${trimmedInput}`);
  };

  return (
    <div className={styles.wrap}>
      <button className={styles.button} onClick={() => router.push('/request')}>
        {isMobile ? '등록' : '+ 채널등록'}
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="채널명으로 검색"
        />
        <button className={styles.submitButton} type="submit">
          <IoSearch color="#fff" size="1.75rem" />
        </button>
      </form>
    </div>
  );
}
