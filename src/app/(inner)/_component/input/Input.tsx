'use client';

import { InputHTMLAttributes, useState } from 'react';
import input from './input.module.scss';
import { GrFormClose } from 'react-icons/gr';
import { IoMdMusicalNote } from 'react-icons/io';
import cx from 'classnames';
import { replaceSpecialCharacters } from '@/util/regexp';

type OriginalInputProps = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<OriginalInputProps, 'onSubmit' | 'value' | 'onReset'> {
  value: string;
  onReset: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, inputValue: string) => void;
}

const Input = ({
  className = '',
  onSubmit,
  type = 'text',
  value = '',
  onChange,
  onReset,
  ...props
}: InputProps) => {
  const handleSubit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, value);
  };

  return (
    <form onSubmit={handleSubit} className={cx(input['form'], className)}>
      <div>
        <input
          {...props}
          type={type}
          className={input['input']}
          value={value}
          onChange={onChange}
        />
        {value ? (
          <button type="button" onClick={onReset}>
            <GrFormClose color="inherit" size="1rem" />
          </button>
        ) : null}
        <button type="submit">
          <IoMdMusicalNote color="inherit" size="1.5rem" />
        </button>
      </div>
    </form>
  );
};

export default Input;
