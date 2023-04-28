/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import search from '@/styles/search/Search.module.scss';

interface SearchSectionProps {
  onSubmit: (name: string) => void;
}

const SearchSection = ({ onSubmit }: SearchSectionProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showErrMsg, setShowErrMsg] = useState(false);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    setInputValue(() => e.target.value);
  }, []);

  const handleResetInputValue = useCallback(() => {
    return setInputValue(() => '');
  }, []);

  const handleOnSubmit = useCallback(
    (e: FormEvent) => {
      setShowErrMsg(() => false);
      e.preventDefault();
      const value = inputValue.trim();
      if (!value) return setShowErrMsg(() => true);
      onSubmit(inputValue);
    },
    [inputValue],
  );

  return (
    <section className={search['search-section']}>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="searchInput">채널명</label>
        <input
          id="searchInput"
          name="searchInput"
          type="text"
          onChange={handleOnChange}
          value={inputValue}
          placeholder="채널명으로 검색"
          tabIndex={1}
        />
        {showErrMsg ? <p>입력되지 않았습니다.</p> : null}
        {inputValue ? (
          <label onClick={handleResetInputValue} tabIndex={0}>
            <GrFormClose color={'inherit'} size={'1.5rem'} />
          </label>
        ) : null}
        <button type="submit">
          <BsSearchHeart color={'inherit'} size={'1.5rem'} />
        </button>
      </form>
    </section>
  );
};

export default SearchSection;
