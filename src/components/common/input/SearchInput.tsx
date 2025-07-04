import { ActionIcon, Input } from '@mantine/core';
import { Search } from 'lucide-react';
import { ChangeEventHandler } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import css from './SearchInput.module.scss';

type SearchInputProps = {
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onSubmit?: () => void;
  disabled?: boolean;
};

export default function SearchInput({
  defaultValue,
  value,
  placeholder,
  onChange,
  onSubmit = () => {},
  disabled,
}: SearchInputProps) {
  const hotkeyRef = useHotkeys<HTMLDivElement>('enter', onSubmit, {
    enableOnFormTags: ['INPUT'],
  });

  return (
    <Input.Wrapper className={css.wrap} ref={hotkeyRef}>
      <Input
        variant="unstyled"
        className={css.inputBox}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <ActionIcon
        className={css.submitButton}
        variant="filled"
        radius="xl"
        disabled={disabled}
        onClick={onSubmit}
      >
        <Search color="#fff" size="1rem" />
      </ActionIcon>
    </Input.Wrapper>
  );
}
