import { UnstyledButton } from '@mantine/core';
import { IconCircleArrowUp } from '@tabler/icons-react';
import variable from '@variable';
import css from './ScheduleNav.module.scss';

import { useWindowScroll } from '@mantine/hooks';
import { forwardRef } from 'react';

export default forwardRef(function TopBtn() {
  const [scroll, scrollTo] = useWindowScroll();

  if (scroll.y <= 120) return null;

  return (
    <UnstyledButton className={css.topBtn} onClick={() => scrollTo({ y: 0 })}>
      <IconCircleArrowUp size="3.5rem" color={variable.secondColorDefault} />
    </UnstyledButton>
  );
});
