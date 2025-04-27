import For from '@/components/common/utils/For';
import { Link } from '@/libraries/i18n';
import { useLocale } from '@/libraries/i18n/client';
import { Anchor, ScrollArea } from '@mantine/core';
import { useUtilsLinksContext } from './Links';
import css from './Sidebar.module.scss';

export default function UtilsSidebar() {
  const links = useUtilsLinksContext();
  const locale = useLocale();
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
      </ScrollArea>
    </aside>
  );
}
