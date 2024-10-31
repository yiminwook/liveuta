import { themeStyleAtom } from '@/app/_lib/atom';
import { ColorPickerValueChangeDetails } from '@ark-ui/react';
import ColorPicker from '@inner/_component/colorPicker/ColorPicker';
import { useAtom } from 'jotai';
import { theme1 } from '@/style/theme';
import getRgb from '../_lib/getRgb';
import * as styles from './form.css';

export default function ColorPickerBox() {
  const [currThemeStyle, setCurrTheme] = useAtom(themeStyleAtom);

  const handleFirstColorChange = (details: ColorPickerValueChangeDetails) => {
    setCurrTheme((pre) => {
      pre.color.first = getRgb(details);
      return { ...pre };
    });
  };

  const handleSecondColorChange = (details: ColorPickerValueChangeDetails) => {
    setCurrTheme((pre) => {
      pre.color.second = getRgb(details);
      return { ...pre };
    });
  };

  const handleThirdColorChange = (details: ColorPickerValueChangeDetails) => {
    setCurrTheme((pre) => {
      pre.color.third = getRgb(details);
      return { ...pre };
    });
  };

  const handleTitleColorChange = (details: ColorPickerValueChangeDetails) => {
    setCurrTheme((pre) => {
      pre.color.title = details.valueAsString;
      return { ...pre };
    });
  };

  const handleTextColorChange = (details: ColorPickerValueChangeDetails) => {
    setCurrTheme((pre) => {
      pre.color.text.default = details.valueAsString;
      return { ...pre };
    });
  };

  const handleActiveTextColorChange = (details: ColorPickerValueChangeDetails) => {
    setCurrTheme((pre) => {
      pre.color.text.active = details.valueAsString;
      return { ...pre };
    });
  };

  return (
    <>
      <div className={styles.colorPickerColumn}>
        <ColorPicker
          label="First Color"
          color={currThemeStyle?.color?.first?.default || theme1.color.first.default}
          onChangeColor={handleFirstColorChange}
        />
        <ColorPicker
          label="Second Color"
          color={currThemeStyle?.color?.second?.default || theme1.color.second.default}
          onChangeColor={handleSecondColorChange}
        />
        <ColorPicker
          label="Third Color"
          color={currThemeStyle?.color?.third?.default || theme1.color.third.default}
          onChangeColor={handleThirdColorChange}
        />
      </div>
      <div className={styles.colorPickerColumn}>
        <ColorPicker
          label="Title Color"
          color={currThemeStyle?.color?.title || theme1.color.title}
          onChangeColor={handleTitleColorChange}
        />
        <ColorPicker
          label="Text Color"
          color={currThemeStyle?.color?.text?.default || theme1.color.text.default}
          onChangeColor={handleTextColorChange}
        />
        <ColorPicker
          label="Active Text Color"
          color={currThemeStyle?.color?.text?.active || theme1.color.text.active}
          onChangeColor={handleActiveTextColorChange}
        />
      </div>
    </>
  );
}
