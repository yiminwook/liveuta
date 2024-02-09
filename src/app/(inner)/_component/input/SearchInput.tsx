'use client';
import { ChangeEvent, CSSProperties, FormEvent, RefObject, useState } from 'react';

interface SearchInputProps {
  ref?: RefObject<HTMLInputElement>;
  style?: CSSProperties;
  placeHolder?: string;
  disabled?: boolean;
  onSearch: (value: string) => void;
}

function SearchInput({
  ref,
  style,
  placeHolder = '',
  disabled = false,
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setValue(() => value);
  };

  const onSubmit = (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        ref={ref}
        style={style ? { ...style } : {}}
        disabled={disabled}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default SearchInput;
