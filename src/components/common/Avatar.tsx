import * as styles from './avatar.css';
import { Avatar as ArkAvatar } from '@ark-ui/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface AvartarProps {
  email: string;
  src: string | undefined | null;
  size: string;
  alt: string;
}

export default function Avatar({ email, src, size, alt }: AvartarProps) {
  const initial = email.slice(0, 2).toUpperCase();

  return (
    <ArkAvatar.Root
      className={styles.wrap}
      style={assignInlineVars(styles.avatarContract, { size })}
    >
      <ArkAvatar.Fallback className={styles.fallback}>{initial}</ArkAvatar.Fallback>
      {src && <ArkAvatar.Image className={styles.image} src={src} alt={alt} />}
    </ArkAvatar.Root>
  );
}
