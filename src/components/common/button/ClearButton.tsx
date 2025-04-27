'use client';
import { useTranslations } from '@/libraries/i18n/client';
import CodiconClearAll from '@icons/codicon/ClearAll';
import TbCheck from '@icons/tabler/Check';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { useCallback, useState } from 'react';
import Show from '../utils/Show';

type ClearButtonProps = {
  timeout?: number;
  clear: () => void;
  className?: string;
  buttonSize?: ActionIconProps['size'];
  size?: string | number;
};

export default function ClearButton({
  clear,
  timeout = 2000,
  size = '1.2rem',
  buttonSize = 'md',
  className,
}: ClearButtonProps) {
  const { t } = useTranslations();

  const [cleared, setCleared] = useState(false);
  const [clearTimeout, setClearTimeout] = useState<number | null>(null);

  const handleClearResult = (value: boolean) => {
    window.clearTimeout(clearTimeout!);
    setClearTimeout(window.setTimeout(() => setCleared(false), timeout));
    setCleared(value);
  };

  const handleClear = useCallback(() => {
    clear();
    handleClearResult(true);
  }, [clear]);

  return (
    <Tooltip
      label={cleared ? t('global.clearButton.cleared') : t('global.clearButton.clear')}
      withArrow
      position="bottom"
      className="swiper-no-swiping"
    >
      <ActionIcon
        onClick={handleClear}
        className={className}
        variant="subtle"
        color={cleared ? 'teal' : 'gray'}
        size={buttonSize}
      >
        <Show when={cleared} fallback={<CodiconClearAll width={size} height={size} />}>
          <TbCheck width={size} height={size} />
        </Show>
      </ActionIcon>
    </Tooltip>
  );
}
