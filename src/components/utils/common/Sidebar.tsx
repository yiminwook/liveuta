import For from '@/components/common/utils/For';
import { Anchor, ScrollArea } from '@mantine/core';
import { useTranslations } from 'next-intl';
import css from './Sidebar.module.scss';
import { useUtilsLinksContext } from './Links';

export default function UtilsSidebar() {
  const t = useTranslations('utils.sidebar');
  const links = useUtilsLinksContext();

  return (
    <aside className={css.wrap}>
      <ScrollArea className={css.scrollArea}>
        <div className={css.sidebarContents}>
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
      </ScrollArea>
    </aside>
  );
}
