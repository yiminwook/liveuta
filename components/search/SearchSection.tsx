/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import search from '@/styles/search/Search.module.scss';
import useInput from '@/hooks/useInput';
import { useRouter } from 'next/router';

const SearchSection = () => {
  const [inputValue, onChangeValue, resetValue, setInputValue] = useInput('');
  const [showErrMsg, setShowErrMsg] = useState(false);

  const {
    push,
    query: { query },
  } = useRouter();

  const nameQuery = query?.toString() ?? '';

  const handleOnSubmit = useCallback(
    async (e: FormEvent) => {
      setShowErrMsg(() => false);
      e.preventDefault();
      const value = inputValue.trim();
      if (!value) return setShowErrMsg(() => true);
      push(`/search?query=${value}`);
    },
    [inputValue],
  );

  useEffect(() => {
    setInputValue(() => nameQuery);
  }, [nameQuery]);

  return (
    <section className={search['search-section']}>
      <div>
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
          {inputValue ? (
            <label onClick={resetValue} tabIndex={0}>
              <GrFormClose color={'inherit'} size={'1.5rem'} />
            </label>
          ) : null}
          <button type="submit">
            <BsSearchHeart color={'inherit'} size={'1.5rem'} />
          </button>
        </form>
        {showErrMsg ? <p>입력되지 않았습니다.</p> : null}
      </div>
    </section>
  );
};

export default SearchSection;
