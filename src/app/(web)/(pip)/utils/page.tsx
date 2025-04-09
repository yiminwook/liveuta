'use client';

import For from '@/components/common/utils/For';
import { useUtilsLinksContext } from '@/components/utils/common/Links';
import { Anchor } from '@mantine/core';
import { useTranslations } from 'next-intl';
import css from './page.module.scss';

export default function Utils() {
  const t = useTranslations('utils.sidebar');
  const links = useUtilsLinksContext();

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
