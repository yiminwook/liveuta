/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type UseInputReturnType = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void,
  Dispatch<SetStateAction<string>>,
];

const useInput = (value: string): UseInputReturnType => {
  const [inputValue, setInputValue] = useState(value);

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputValue(() => e.target.value);
  }, []);

  const resetValue = useCallback(() => {
    setInputValue(() => '');
  }, []);

  return [inputValue, onChangeValue, resetValue, setInputValue];
};

export default useInput;
