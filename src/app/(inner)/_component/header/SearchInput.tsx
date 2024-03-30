import { ChangeEvent, CSSProperties, FormEvent, useState } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';
import * as styles from '../input/searchInput.css';
import dayjs from '@/model/dayjs';
import { gtag } from '@inner/_lib/gtag';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchInputProps = {
  disabled?: boolean;
};

export default function SearchInput({ disabled }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get('q') || '';
  const pathName = usePathname();
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(() => value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    gtag('event', 'search', {
      channelName: trimmedValue,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    const query = new URLSearchParams(searchParams);
    query.set('q', trimmedValue);
    router.push(`${pathName}?${query.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrap}>
      <input
        className={styles.input}
        type="text"
        disabled={disabled}
        placeholder={'채널명으로 검색'}
        value={value}
        onChange={onChange}
      />
      <button className={styles.submitButton} type="submit" disabled={disabled}>
        <IoMdMusicalNote color="inherit" size="1.5rem" />
      </button>
    </form>
  );
}
