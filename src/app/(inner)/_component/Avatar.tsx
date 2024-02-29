/* eslint-disable @next/next/no-img-element */
import * as styles from './avatar.css';
import cx from 'classnames';

interface AvartarProps {
  className?: string;
  email: string;
  src: string | undefined | null;
  size: number;
  alt: string;
}

export default function Avatar({ className, email, src, size, alt }: AvartarProps) {
  const initial = email.slice(0, 2).toUpperCase();

  if (!src) {
    return (
      <div
        className={cx(styles.wrap, styles.placeholder, className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`,
        }}
      >
        {initial}
      </div>
    );
  }

  return (
    <img className={cx(styles.wrap, className)} src={src} alt={alt} width={size} height={size} />
  );
}
