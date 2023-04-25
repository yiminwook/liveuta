import { ChangeEvent, CSSProperties, FormEvent, RefObject, useState } from 'react';

interface SearchProps {
  ref?: RefObject<HTMLInputElement>;
  style?: CSSProperties;
  placeHolder?: string;
  disabled?: boolean;
  searchFunc: (value: string) => void;
}

const Search = ({ ref, style, placeHolder = '', disabled = false, searchFunc }: SearchProps) => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setValue(() => value);
  };

  const onSubmit = (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    searchFunc(value);
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
};

export default Search;
