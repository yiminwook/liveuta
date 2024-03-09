'use client';
import dayjs from '@/model/dayjs';
import { useSearchQuery } from '@inner/_lib/getSearch';
import { gtag } from '@inner/_lib/gtag';
import { replaceSpecialCharacters } from '@inner/_lib/regexp';
import Input from '@inner/_component/input/Input';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import search from './search.module.scss';

export default function SearchSection() {
  const route = useRouter();
  const pathname = usePathname();
  const searchQuery = useSearchQuery();

  const [showErrMsg, setShowErrMsg] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent, inputValue: string) => {
      e.preventDefault();
      setShowErrMsg(() => false);
      const value = inputValue.trim();
      if (!value) return setShowErrMsg(() => true);
      gtag('event', 'search', { channelName: value, time: dayjs().format('YYYY-MM-DD HH:mm:ss') });
      route.push(`${pathname}?query=${value}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputValue],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setInputValue(() => value);
  }, []);

  const handleReset = useCallback(() => {
    setInputValue(() => '');
  }, []);

  useEffect(() => {
    handleChange(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <section className={search['search-section']}>
      <div>
        <label htmlFor="search-input" className="blind">
          채널명 검색
        </label>
        <Input
          id="search-input"
          name="search-input"
          className={search['search-input']}
          type="text"
          onSubmit={handleSubmit}
          onChange={handleChange}
          onReset={handleReset}
          value={inputValue}
          placeholder="채널명으로 검색"
        />
        {showErrMsg ? <p>입력되지 않았습니다.</p> : null}
      </div>
    </section>
  );
}
