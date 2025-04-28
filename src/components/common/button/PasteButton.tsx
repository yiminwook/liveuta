'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import TablerClipboard from '@icons/tabler/Clipboard';
import TablerClipboardCheck from '@icons/tabler/ClipboardCheck';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { useCallback, useState } from 'react';
import Show from '../utils/Show';

type PasteButtonProps = {
  timeout?: number;
  paste: (value: ClipboardItem) => void;
  className?: string;
  buttonSize?: ActionIconProps['size'];
  size?: string | number;
};

export default function PasteButton({
  paste,
  timeout = 2000,
  size = '1.2rem',
  buttonSize = 'md',
  className,
}: PasteButtonProps) {
  const { t } = useTranslations();

  const [pasted, setPasted] = useState(false);
  const [pasteTimeout, setPasteTimeout] = useState<number | null>(null);

  const handlePasteResult = (value: boolean) => {
    window.clearTimeout(pasteTimeout!);
    setPasteTimeout(window.setTimeout(() => setPasted(false), timeout));
    setPasted(value);
  };

  const handlePaste = useCallback(async () => {
    let item: ClipboardItems;
    try {
      item = await navigator.clipboard.read();
    } catch (e) {
      console.error('Failed to read clipboard contents: ', e);
      return;
    }

    paste(item[0]);
    handlePasteResult(true);
  }, [paste]);

  return (
    <Tooltip
      label={pasted ? t('global.pasteButton.pasted') : t('global.pasteButton.paste')}
      withArrow
      position="bottom"
      className="swiper-no-swiping"
    >
      <ActionIcon
        onClick={handlePaste}
        className={className}
        variant="subtle"
        color={pasted ? 'teal' : 'gray'}
        size={buttonSize}
      >
        <Show when={pasted} fallback={<TablerClipboard width={size} height={size} />}>
          <TablerClipboardCheck width={size} height={size} />
        </Show>
      </ActionIcon>
    </Tooltip>
  );
}
