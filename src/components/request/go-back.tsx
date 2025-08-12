'use client';
import { useLocale } from '@/libraries/i18n/client';
import { useRouter } from '@bprogress/next';
import { ActionIcon } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';

export default function GoBack() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <ActionIcon variant="subtle" onClick={() => router.push(`/${locale}/channel`)}>
      <ArrowLeft />
    </ActionIcon>
  );
}
