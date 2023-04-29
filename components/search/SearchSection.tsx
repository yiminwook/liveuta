/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import search from '@/styles/search/Search.module.scss';
import useInput from '@/hooks/UseInput';

interface SearchSectionProps {
  searchMsg: string;
  onSubmit: (name: string) => Promise<void>;
}

const SearchSection = ({ onSubmit, searchMsg }: SearchSectionProps) => {
  const [inputValue, onChangeValue, resetValue] = useInput('');
  const [showErrMsg, setShowErrMsg] = useState(false);

  const handleOnSubmit = useCallback(
    async (e: FormEvent) => {
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
          onChange={onChangeValue}
          value={inputValue}
          placeholder="채널명으로 검색"
          tabIndex={1}
        />
        {showErrMsg ? <p>입력되지 않았습니다.</p> : null}
        {inputValue ? (
          <label onClick={resetValue} tabIndex={0}>
            <GrFormClose color={'inherit'} size={'1.5rem'} />
          </label>
        ) : null}
        <button type="submit">
          <BsSearchHeart color={'inherit'} size={'1.5rem'} />
        </button>
      </form>
      {searchMsg !== '' ? <p>{`"${searchMsg}" 검색결과`}</p> : null}
    </section>
  );
};

export default SearchSection;
