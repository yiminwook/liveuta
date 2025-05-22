'use client';
import { useLocale } from '@/libraries/i18n/client';
import { ActionIcon } from '@mantine/core';
import { IconArrowBigLeftFilled } from '@tabler/icons-react';
import { useRouter } from 'next-nprogress-bar';

export default function GoBack() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <ActionIcon onClick={() => router.push(`/${locale}/channel`)}>
      <IconArrowBigLeftFilled />
    </ActionIcon>
  );
}
