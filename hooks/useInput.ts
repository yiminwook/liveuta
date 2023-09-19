import { replaceSpecialCharacters } from '@/utils/regexp';
import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (value: string) => {
  const [inputValue, setInputValue] = useState(value);

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    // 특수문자 입력방지
    const value = replaceSpecialCharacters(e.target.value);
    setInputValue(() => value);
  }, []);

  const resetValue = useCallback(() => {
    setInputValue(() => '');
  }, []);

  return { inputValue, onChangeValue, resetValue, setInputValue };
};

export default useInput;
