import { ColorPicker as ArkColorPicker, ColorPickerValueChangeDetails } from '@ark-ui/react';
import { useState } from 'react';
import { CiPickerHalf } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import * as styles from './colorPicker.css';

type ColorChannel =
  | 'hue'
  | 'saturation'
  | 'brightness'
  | 'lightness'
  | 'red'
  | 'green'
  | 'blue'
  | 'alpha';
const COLORS = ['#FFC1CC', '#C8E9CA', '#ACE7FF', '#0D1524', '#251C1C'];
const CHANNELS: ColorChannel[] = ['hue', 'brightness', 'saturation'];

type ColorPickerProps = {
  label: string;
  color: string;
  onChangeColor: (value: ColorPickerValueChangeDetails) => void;
};

export default function ColorPicker({ label, color, onChangeColor }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <ArkColorPicker.Root
      className={styles.root}
      value={color}
      open={isOpen}
      format="rgba"
      unmountOnExit
      onOpenChange={({ open }) => setIsOpen(open)}
      onValueChangeEnd={onChangeColor}
    >
      <div className={styles.labelBox}>
        <ArkColorPicker.Label>{`${label}:`}</ArkColorPicker.Label>
        <ArkColorPicker.ValueText />
      </div>
      <ArkColorPicker.Control className={styles.control}>
        <ArkColorPicker.ChannelInput className={styles.input} channel="hex" />
        <ArkColorPicker.Trigger className={styles.trigger}>
          {/* <ArkColorPicker.TransparencyGrid /> */}
          <ArkColorPicker.Swatch className={styles.swatch} value={color} />
        </ArkColorPicker.Trigger>
      </ArkColorPicker.Control>
      <ArkColorPicker.Positioner className={styles.positioner}>
        <ArkColorPicker.Content className={styles.content}>
          <button className={styles.closeButton} onClick={onClose}>
            <IoCloseOutline size="25px" />
          </button>
          <ArkColorPicker.Area>
            <ArkColorPicker.AreaBackground className={styles.areaBg} />
            <ArkColorPicker.AreaThumb className={styles.thumb} />
          </ArkColorPicker.Area>
          {CHANNELS.map((channel) => (
            <ArkColorPicker.ChannelSlider key={`channelSlider_${channel}`} channel={channel}>
              <ArkColorPicker.ChannelSliderTrack className={styles.slider} />
              <ArkColorPicker.ChannelSliderThumb className={styles.thumb} />
            </ArkColorPicker.ChannelSlider>
          ))}
          <ArkColorPicker.SwatchGroup className={styles.shortCutBox}>
            {COLORS.map((color) => (
              <ArkColorPicker.SwatchTrigger
                key={color}
                value={color}
                className={styles.shortCutTigger}
              >
                <ArkColorPicker.Swatch value={color} className={styles.swatch} />
              </ArkColorPicker.SwatchTrigger>
            ))}
            <ArkColorPicker.EyeDropperTrigger className={styles.shortCutTigger}>
              <CiPickerHalf size="15px" />
            </ArkColorPicker.EyeDropperTrigger>
          </ArkColorPicker.SwatchGroup>
          <ArkColorPicker.View format="rgba" className={styles.rgbaBox}>
            <div>
              <ArkColorPicker.Label>R</ArkColorPicker.Label>
              <ArkColorPicker.ChannelInput className={styles.input} channel="red" />
            </div>
            <div>
              <ArkColorPicker.Label>G</ArkColorPicker.Label>
              <ArkColorPicker.ChannelInput className={styles.input} channel="green" />
            </div>
            <div>
              <ArkColorPicker.Label>B</ArkColorPicker.Label>
              <ArkColorPicker.ChannelInput className={styles.input} channel="blue" />
            </div>
            {/* <div>
              <ArkColorPicker.Label>A</ArkColorPicker.Label>
              <ArkColorPicker.ChannelInput className={styles.input} channel="alpha" />
            </div> */}
          </ArkColorPicker.View>
        </ArkColorPicker.Content>
      </ArkColorPicker.Positioner>
    </ArkColorPicker.Root>
  );
}
