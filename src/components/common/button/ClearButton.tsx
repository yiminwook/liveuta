'use client';
import CodiconClearAll from '@icons/codicon/ClearAll';
import TbCheck from '@icons/tabler/Check';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import Show from '../utils/Show';

type ClearButtonProps = {
  timeout?: number;
  clear: () => void;
  className?: string;
  size?: string | number;
};

export default function ClearButton({
  clear,
  timeout = 2000,
  size = '1.2rem',
  className,
}: ClearButtonProps) {
  const t = useTranslations('global.clearButton');

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
      label={cleared ? t('cleared') : t('clear')}
      withArrow
      position="bottom"
      className="swiper-no-swiping"
    >
      <ActionIcon
        onClick={handleClear}
        className={className}
        variant="subtle"
        color={cleared ? 'teal' : 'gray'}
      >
        <Show when={cleared} fallback={<CodiconClearAll width={size} height={size} />}>
          <TbCheck width={size} height={size} />
        </Show>
      </ActionIcon>
    </Tooltip>
  );
}
