'use client';
import For from '@/components/common/utils/For';
import { useUtilsLinksContext } from '@/components/utils/common/Links';
import { Link } from '@/libraries/i18n';
import { useLocale } from '@/libraries/i18n/client';
import { Anchor } from '@mantine/core';
import css from './page.module.scss';

export default function Utils() {
  const links = useUtilsLinksContext();
  const locale = useLocale();
  return (
    <div className={css.contents}>
      <For each={links}>
        {(group, index) => (
          <div key={`utils-group-${index}`} className={css.group}>
            <h3 className={css.groupTitle}>{group.text}</h3>
            <div className={css.groupItems}>
              <For each={group.items}>
                {(item, itemIndex) => (
                  <Anchor
                    key={`utils-group-${index}-${itemIndex}`}
                    href={item.href}
                    className={css.item}
                    locale={locale}
                    component={Link}
                  >
                    {item.text}
                  </Anchor>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
