import { Menu as ArkMenu } from '@ark-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import * as styles from './headerMenu.css';
import cx from 'classnames';

type HeaderMenuProps = {
  title: string;
  links: { href: string; text: string }[];
};

export default function HeaderMenu({ title, links }: HeaderMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={styles.root}>
      <ArkMenu.Root open={true} onSelect={({ value }) => router.push(value)}>
        <ArkMenu.Trigger className={styles.trigger}>{title}</ArkMenu.Trigger>
        <ArkMenu.Positioner
          style={{
            top: -10,
            paddingTop: 10,
          }}
        >
          <ArkMenu.Content className={styles.content}>
            {links.map((link) => (
              <ArkMenu.Item
                key={`headerMenu-${link.text}`}
                className={cx(styles.item, pathname === link.href && 'active')}
                id={link.href}
              >
                {link.text}
              </ArkMenu.Item>
            ))}
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </ArkMenu.Root>
    </div>
  );
}
