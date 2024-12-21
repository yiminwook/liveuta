'use client';
import { Button, TextInput, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { TbX } from 'react-icons/tb';
import css from './Nav.module.scss';

export default function Nav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = useState(searchParams.get('q') || '');
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);

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
      {/* <button className={css.requestChannelButton} onClick={() => router.push('/request')}>
        {isDesktop ? '+ 채널등록' : '등록'}
      </button> */}
      <Button color="second" variant="filled" onClick={() => router.push('/request')}>
        {isDesktop ? '+ 채널등록' : '등록'}
      </Button>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputBox}>
          <TextInput
            classNames={{ input: css.input }}
            value={input}
            onChange={handleInput}
            placeholder="채널명으로 검색"
          />
          <button className={css.clearButton} type="button" onClick={() => setInput('')}>
            <TbX />
          </button>
        </div>
        <UnstyledButton className={css.submit} type="submit">
          <IoSearch color="#fff" size="1.75rem" />
        </UnstyledButton>
      </form>
    </div>
  );
}
