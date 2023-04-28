/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

interface SearchSectionProps {
  onSubmit: (name: string) => void;
}

const SearchSection = ({ onSubmit }: SearchSectionProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showErrMsg, setShowErrMsg] = useState(false);
  console.log(inputValue);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    setInputValue(() => e.target.value);
  }, []);

  const handleOnSubmit = useCallback(
    (e: FormEvent) => {
      setShowErrMsg(() => false);
      e.preventDefault();
      const value = inputValue.trim();
      if (!value) return setShowErrMsg(() => true);
      // onSubmit(inputValue);
    },
    [inputValue],
  );

  return (
    <section>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="searchInput">채널명</label>
        <input id="searchInput" name="searchInput" type="text" onChange={handleOnChange} />
        {showErrMsg ? <p>입력되지 않았습니다.</p> : null}
        <button type="submit">검색</button>
      </form>
    </section>
  );
};

export default SearchSection;
