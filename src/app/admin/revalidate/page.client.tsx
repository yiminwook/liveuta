'use client';
import { Box, Button, Divider, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

type Props = {};

export default function Client({}: Props) {
  const session = useSession().data!;

  const mutation = useMutation({
    mutationFn: (tag: string) =>
      fetch(`/api/v1/revalidate?tag=${tag}`).then(
        (res) => res.json() as Promise<{ revalidated: boolean; now: number; kind: string }>,
      ),
    onSuccess: () => {
      toast.success('캐시 초기화 완료');
    },
  });

  const onClick = (tag: 'channel' | 'metadata' | 'featured') => (e: React.MouseEvent) => {
    if (mutation.isPending) return;
    mutation.mutate(tag);
  };

  return (
    <div>
      <h2>캐시검증 (강제 초기화)</h2>
      <p className="essential">
        초기화후 캐시된 페이지를 두세번 새로고침하면 변경이 확인 가능합니다.
      </p>

      <Divider mb={32} />

      <Box>
        <Text fw="bold">메타데이터</Text>
        <p>revalidate-time 3600초(1시간)</p>
        <p>API - GET: https://liveuta.vercel.app/api/v1/revalidate?tag=metadata</p>
        <Button loading={mutation.isPending} onClick={onClick('metadata')}>
          캐시 초기화
        </Button>
      </Box>

      <Box mt={48}>
        <Text fw="bold">채널정보</Text>
        <p>revalidate-time 1800초(30분)</p>
        <p>API - GET: https://liveuta.vercel.app/api/v1/revalidate?tag=channel</p>
        <Button loading={mutation.isPending} onClick={onClick('channel')}>
          캐시 초기화
        </Button>
      </Box>

      <Box mt={48}>
        <Text fw="bold">특집정보</Text>
        <p>revalidate-time 86400초(1일)</p>
        <p>API - GET: https://liveuta.vercel.app/api/v1/revalidate?tag=featured</p>
        <Button loading={mutation.isPending} onClick={onClick('featured')}>
          캐시 초기화
        </Button>
      </Box>
    </div>
  );
}
