import { UnstyledButton } from '@mantine/core';
import { IconCircleArrowUp } from '@tabler/icons-react';
import css from './ScheduleNav.module.scss';
import variable from '@variable';

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
