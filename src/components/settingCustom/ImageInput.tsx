import { ChangeEvent, useId, useState } from 'react';
import { CiSaveDown2 } from 'react-icons/ci';
import * as styles from './imageInput.css';

type ImageInputProps = {
  label: string;
  defaultValue: string;
  setValue: (value: string) => void;
};

export default function ImageInput({ label, defaultValue, setValue }: ImageInputProps) {
  const [input, setInput] = useState(defaultValue);
  const id = useId();

  const inputId = `imageInput${id}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.inner}>
        <input
          className={styles.input}
          type="text"
          id={inputId}
          value={input}
          onChange={handleChange}
        />
        <button className={styles.button} type="button" onClick={() => setValue(input)}>
          <CiSaveDown2 size="1.5rem" />
        </button>
      </div>
    </div>
  );
}
