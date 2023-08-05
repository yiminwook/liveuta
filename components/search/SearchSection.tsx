'use client';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import search from '@/components/search/Search.module.scss';
import useInput from '@/hooks/useInput';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchQuery } from '@/hooks/useSearch';
import Input from '@/components/common/Input';

const SearchSection = () => {
  const { inputValue, onChangeValue, setInputValue } = useInput('');
  const [showErrMsg, setShowErrMsg] = useState(false);

  const { push } = useRouter();
  const pathname = usePathname();
  const searchQuery = useSearchQuery();

  const handleOnSubmit = useCallback(
    async (e: FormEvent, inputValue: string) => {
      setShowErrMsg(() => false);
      const value = inputValue.trim();
      if (!value) return setShowErrMsg(() => true);
      push(`${pathname}?query=${value}`);
    },
    [inputValue],
  );

  useEffect(() => {
    setInputValue(() => searchQuery);
  }, [searchQuery]);

  return (
    <section className={search['search-section']}>
      <div>
        <label htmlFor="searchInput" className="blind">
          채널명 검색
        </label>
        <Input
          id="searchInput"
          name="searchInput"
          className={search['searchInput']}
          type="text"
          onSubmit={handleOnSubmit}
          value={inputValue}
          placeholder="채널명으로 검색"
        />
        {showErrMsg ? <p>입력되지 않았습니다.</p> : null}
      </div>
    </section>
  );
};

export default SearchSection;
