'use client';
import { useTranslations } from '@/libraries/i18n/client';
import TbCheck from '@icons/tabler/Check';
import TbCopy from '@icons/tabler/Copy';
import {
  ActionIcon,
  ActionIconProps,
  CopyButton as MantineCopyButton,
  Tooltip,
} from '@mantine/core';
import { CSSProperties } from 'react';

interface CopyButtonProps {
  value: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  buttonSize?: ActionIconProps['size'];
}

/** value 복사할 값 */
export default function CopyButton({
  value,
  size = '1.2rem',
  buttonSize = 'md',
  className,
}: CopyButtonProps) {
  const { t } = useTranslations();

  return (
    <MantineCopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          className="swiper-no-swiping"
          label={copied ? t('global.copyButton.copied') : t('global.copyButton.copy')}
          withArrow
          position="bottom"
        >
          <ActionIcon
            className={className}
            color={copied ? 'teal' : 'gray'}
            variant="subtle"
            onClick={copy}
            size={buttonSize}
          >
            {copied ? (
              <TbCheck width={size} height={size} />
            ) : (
              <TbCopy width={size} height={size} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  );
}
