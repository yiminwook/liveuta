'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import { TextInput, UnstyledButton } from '@mantine/core';
import { BREAK_POINT } from '@/styles/var';
import css from './Nav.module.scss';

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
    router.push(`/channel?q=${trimmedInput}`);
  };

  return (
    <div className={css.wrap}>
      <button className={css.requestChannelButton} onClick={() => router.push('/request')}>
        {isMobile ? '등록' : '+ 채널등록'}
      </button>
      <form className={css.form} onSubmit={handleSubmit}>
        <TextInput
          classNames={{ input: css.input }}
          value={input}
          onChange={handleInput}
          placeholder="채널명으로 검색"
        />
        <UnstyledButton className={css.submit} type="submit">
          <IoSearch color="#fff" size="1.75rem" />
        </UnstyledButton>
      </form>
    </div>
  );
}
