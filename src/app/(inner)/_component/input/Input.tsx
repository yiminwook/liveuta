'use client';
import { InputHTMLAttributes } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { IoMdMusicalNote } from 'react-icons/io';
import * as styles from './input.css';
import cx from 'classnames';

type OriginalInputProps = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<OriginalInputProps, 'onSubmit' | 'value' | 'onReset'> {
  value: string;
  onReset: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, inputValue: string) => void;
}

function Input({
  className = '',
  onSubmit,
  type = 'text',
  value = '',
  onChange,
  onReset,
  ...props
}: InputProps) {
  const handleSubit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, value);
  };

  return (
    <form onSubmit={handleSubit} className={cx(styles.form, className)}>
      <div className={styles.inner}>
        <input {...props} type={type} className={styles.input} value={value} onChange={onChange} />
        {value ? (
          <button className={styles.resetButton} type="button" onClick={onReset}>
            <GrFormClose color="inherit" size="1rem" />
          </button>
        ) : null}
        <button className={styles.submitButton} type="submit">
          <IoMdMusicalNote color="inherit" size="1.5rem" />
        </button>
      </div>
    </form>
  );
}

export default Input;
