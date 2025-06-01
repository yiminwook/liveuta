'use client';
import { useLocale } from '@/libraries/i18n/client';
import { ActionIcon } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

export default function GoBack() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <ActionIcon variant="subtle" onClick={() => router.push(`/${locale}/channel`)}>
      <ArrowLeft />
    </ActionIcon>
  );
}
