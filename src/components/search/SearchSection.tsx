'use client';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import search from '@/components/search/Search.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchQuery } from '@/queries/search';
import Input from '@/components/common/Input';
import { replaceSpecialCharacters } from '@/util/regexp';
import { gtag } from '@/util/gtag';
import dayjs from '@/model/dayjs';

const SearchSection = () => {
  const route = useRouter();
  const pathname = usePathname();
  const searchQuery = useSearchQuery();

  const [showErrMsg, setShowErrMsg] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent, inputValue: string) => {
      setShowErrMsg(() => false);
      const value = inputValue.trim();
      if (!value) return setShowErrMsg(() => true);
      gtag('event', 'search', { channelName: value, time: dayjs().format('YYYY-MM-DD HH:mm:ss') });
      route.push(`${pathname}?query=${value}`);
    },
    [inputValue],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    const replacedValue = replaceSpecialCharacters(value);
    setInputValue(() => replacedValue);
  }, []);

  const handleReset = useCallback(() => {
    setInputValue(() => '');
  }, []);

  useEffect(() => {
    handleChange(searchQuery);
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
};

export default SearchSection;
