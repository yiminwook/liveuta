'use client';
import * as Icons from '@/icons';
import { CopyButton as MantineCopyButton, Tooltip } from '@mantine/core';
import css from './page.module.scss';

export default function Page() {
  return (
    <div className={css.wrap}>
      <div className={css.grid}>
        {Object.entries(Icons).map(([key, Icon]) => (
          <Container key={key} Icon={Icon} label={key} />
        ))}
      </div>
    </div>
  );
}

function Container({
  label,
  Icon,
}: { label: string; Icon: React.ComponentType<{ width: number; height: number }> }) {
  return (
    <MantineCopyButton value={label} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
          <div className={css.container} onClick={copy}>
            <div className={css.iconBox}>
              <Icon width={50} height={50} />
            </div>

            <span className={css.label}>{label}</span>
          </div>
        </Tooltip>
      )}
    </MantineCopyButton>
  );
}
