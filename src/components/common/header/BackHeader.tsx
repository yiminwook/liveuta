import { Anchor, Breadcrumbs, UnstyledButton } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import variable from '@variable';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import css from './BackHeader.module.scss';

export default function BackHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const pathArr = pathname.split('/').filter((item) => item !== '');

  const home = { title: 'home', href: '/' };
  const items = pathArr.map((item, index) => {
    const href = '/' + pathArr.slice(0, index + 1).join('/');
    return { title: item, href: href };
  });

  const navigateBack = () => {
    const url = items.length > 1 ? items[items.length - 1].href : '/';
    router.push(url);
  };

  return (
    <header className={css.wrap}>
      <UnstyledButton mr={16} className={css.backBtn} onClick={navigateBack}>
        <IconArrowNarrowLeft size="2rem" color={variable.thirdColorDefault} />
        <span>돌아가기</span>
      </UnstyledButton>
      <Breadcrumbs separatorMargin="md" color={variable.thirdColorDefault}>
        {[home, ...items].map((item, index) => (
          <Anchor href={item.href} key={index}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
    </header>
  );
}
