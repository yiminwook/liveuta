'use client';
import { ActionIcon, CopyButton as MantineCopyButton, Tooltip } from '@mantine/core';
import { CSSProperties } from 'react';
import TbCheck from '~icons/tabler/check.jsx';
import TbCopy from '~icons/tabler/copy.jsx';

interface CopyButtonProps {
  value: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
}

/** value 복사할 값 */
export default function CopyButton({ value, size = '1.2rem', className }: CopyButtonProps) {
  return (
    <MantineCopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          className="swiper-no-swiping"
          label={copied ? 'Copied' : 'Copy'}
          withArrow
          position="bottom"
        >
          <ActionIcon
            className={className}
            color={copied ? 'teal' : 'gray'}
            variant="subtle"
            onClick={copy}
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
