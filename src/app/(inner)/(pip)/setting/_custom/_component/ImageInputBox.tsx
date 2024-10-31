'use client';
import { themeStyleAtom } from '@/app/_lib/atom';
import { useAtom } from 'jotai';
import ImageInput from './ImageInput';
import getCssUrl from '../_lib/getCssUrl';

export default function ImageInputBox() {
  const [theme, setTheme] = useAtom(themeStyleAtom);

  const handleLeftPreview = (value: string) => {
    setTheme((pre) => {
      pre.background.left.url = `url(${value})`;
      pre.background.left.position = '50%';
      return { ...pre };
    });
  };

  const handleRightPreview = (value: string) => {
    setTheme((pre) => {
      pre.background.right.url = `url(${value})`;
      pre.background.right.position = '50%';
      return { ...pre };
    });
  };

  return (
    <>
      <ImageInput
        label="왼쪽 이미지"
        defaultValue={getCssUrl(theme?.background?.left?.url || '')}
        setValue={handleLeftPreview}
      />
      <ImageInput
        label="오른쪽 이미지"
        defaultValue={getCssUrl(theme?.background?.right?.url || '')}
        setValue={handleRightPreview}
      />
    </>
  );
}
