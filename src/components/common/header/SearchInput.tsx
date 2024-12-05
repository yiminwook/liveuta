import { ChangeEventHandler } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';
import { ActionIcon, Input } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import css from './SearchInput.module.scss';

type SearchInputProps = {
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onEnterPress?: () => void;
  disabled?: boolean;
};

export default function SearchInput({
  value,
  placeholder,
  onChange,
  onEnterPress = () => {},
  disabled,
}: SearchInputProps) {
  return (
    <Input.Wrapper className={css.wrap} onKeyDown={getHotkeyHandler([['enter', onEnterPress]])}>
      <Input
        variant="unstyled"
        className={css.input}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <ActionIcon
        className={css.submitButton}
        variant="filled"
        radius="xl"
        type="submit"
        disabled={disabled}
      >
        <IoMdMusicalNote color="#fff" size="1.5rem" />
      </ActionIcon>
    </Input.Wrapper>
  );
}
