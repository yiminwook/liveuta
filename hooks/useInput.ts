import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (value: string) => {
  const [inputValue, setInputValue] = useState(value);

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputValue(() => e.target.value);
  }, []);

  const resetValue = useCallback(() => {
    setInputValue(() => '');
  }, []);

  return { inputValue, onChangeValue, resetValue, setInputValue };
};

export default useInput;
