import TbCircleArrowUp from '@icons/tabler/CircleArrowUp';
import { UnstyledButton } from '@mantine/core';
import variable from '@variable';
import css from './ScheduleNav.module.scss';

import { useWindowScroll } from '@mantine/hooks';
import { forwardRef } from 'react';

export default forwardRef(function TopBtn() {
  const [scroll, scrollTo] = useWindowScroll();

  if (scroll.y <= 120) return null;

  return (
    <UnstyledButton className={css.topBtn} onClick={() => scrollTo({ y: 0 })}>
      <TbCircleArrowUp width="3.5rem" height="3.5rem" color={variable.secondColorDefault} />
    </UnstyledButton>
  );
});
