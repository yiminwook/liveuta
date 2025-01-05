import { Button, ButtonProps } from '@mantine/core';
import classNames from 'classnames';
import Link from 'next/link';
import IonArrowRightC from '~icons/ion/arrow-right-c.jsx';
import css from './MoreButton.module.scss';

type MoreButtonProps = ButtonProps & {
  href?: string;
  onClick?: () => void;
  component?: 'a' | 'button' | typeof Link;
};

export default function MoreButton({
  href,
  className,
  component = Link,
  onClick,
}: MoreButtonProps) {
  return (
    <Button
      className={classNames(css.button, className)}
      variant="transparent"
      component={component as 'symbol' | undefined}
      href={href}
      onClick={onClick}
      rightSection={<IonArrowRightC />}
    >
      More
    </Button>
  );
}
