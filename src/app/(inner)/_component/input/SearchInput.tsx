import { ChangeEvent, CSSProperties, FormEvent, useState } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';
import * as styles from './searchInput.css';

interface SearchInputProps {
  style?: CSSProperties;
  placeHolder?: string;
  disabled?: boolean;
  onSearch: (value: string) => void;
}

export default function SearchInput({ style, placeHolder, disabled, onSearch }: SearchInputProps) {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(() => value);
  };

  const onSubmit = (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrap}>
      <input
        className={styles.input}
        type="text"
        style={style ? { ...style } : {}}
        disabled={disabled}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      <button className={styles.submitButton} type="submit" disabled={disabled}>
        <IoMdMusicalNote color="inherit" size="1.5rem" />
      </button>
    </form>
  );
}
