import { ActionIcon, Input } from '@mantine/core';
import { ChangeEventHandler } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { IoMdMusicalNote } from 'react-icons/io';
import css from './SearchInput.module.scss';

type SearchInputProps = {
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onEnterPress?: () => void;
  disabled?: boolean;
};

export default function SearchInput({
  defaultValue,
  value,
  placeholder,
  onChange,
  onEnterPress = () => {},
  disabled,
}: SearchInputProps) {
  const hotkeyRef = useHotkeys<HTMLDivElement>('enter', onEnterPress, {
    enableOnFormTags: ['INPUT'],
  });

  return (
    <Input.Wrapper className={css.wrap} ref={hotkeyRef}>
      <Input
        variant="unstyled"
        className={css.input}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <ActionIcon className={css.submitButton} variant="filled" radius="xl" disabled={disabled}>
        <IoMdMusicalNote color="#fff" size="1.5rem" />
      </ActionIcon>
    </Input.Wrapper>
  );
}
