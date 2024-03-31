'use client';
import { themeStyleAtom } from '@/app/_lib/atom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import ColorPickerBox from './ColorPickerBox';
import DarkModeRadio from './DarkModeRadio';
import ImageInputBox from './ImageInputBox';
import * as styles from './form.css';
import Cookies from 'universal-cookie';
import cx from 'classnames';

export default function Form() {
  const router = useRouter();
  const [themeStyle] = useAtom(themeStyleAtom);

  const handleSave = () => {
    const themeCookie = new Cookies();
    const themeString = JSON.stringify(themeStyle);
    localStorage.setItem('customTheme', themeString);
    themeCookie.set('theme', 'theme6', { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 });
    router.refresh();
  };

  const handleReset = () => {
    const themeCookie = new Cookies();
    themeCookie.set('theme', 'theme1', { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 });
    localStorage.removeItem('customTheme');
    window.location.reload();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.colorPickerBox}>
          <ColorPickerBox />
        </div>
        <div className={styles.colorPickerBox}>
          <ImageInputBox />
        </div>
        <div className={styles.darkModeBox}>
          <DarkModeRadio />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={handleSave}>
            저장하기
          </button>
          <button className={cx(styles.button, styles.resetButton)} onClick={handleReset}>
            초기화
          </button>
        </div>
        <p className={styles.alert}>* 화면이 제대로 보이지 않는경우는 초기화 해주세요</p>
      </div>
    </div>
  );
}
