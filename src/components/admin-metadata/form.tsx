import { clientApi, revalidateApi } from '@/apis/fetcher';
import { METADATAS_TAG } from '@/constants/revalidateTag';
import { TMetadata } from '@/types';
import { TUpdateMetadataDto } from '@/types/dto';
import { Box, Button, Flex, LoadingOverlay, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  session: Session;
};

export default function Form({ session }: Props) {
  const [coverUrl, setCoverUrl] = useState('');
  const [defaultVid, serDefaultVid] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (dto: TUpdateMetadataDto) => {
      const json = await clientApi
        .patch('v1/metadata', {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
          json: dto,
        })
        .json();

      return json;
    },
    onSuccess: async () => {
      await revalidateApi.get('?tag=' + METADATAS_TAG);
      await queryClient.invalidateQueries({ queryKey: [METADATAS_TAG] });
      toast.success('업데이트 되었습니다.');
    },
  });

  const onSave = (key: keyof TMetadata, value: string) => {
    if (mutation.isPending) return;
    mutation.mutate({ key, value: value.trim() });
  };

  const onChangeCoverUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverUrl(() => e.target.value);
  };

  const onChangeDefaultVid = (e: React.ChangeEvent<HTMLInputElement>) => {
    serDefaultVid(() => e.target.value);
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={mutation.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />

      <Flex mb={28} align="flex-end">
        <TextInput
          flex={1}
          mr={14}
          label="홈 배너 이미지"
          styles={{ description: { wordBreak: 'break-all' } }}
          description="ex) https://i.ytimg.com/vi/G8O3VXFoIHs/mqdefault.jpg"
          value={coverUrl}
          onChange={onChangeCoverUrl}
          disabled={mutation.isPending}
        />
        <Button loading={mutation.isPaused} onClick={() => onSave('cover_image_url', coverUrl)}>
          저장
        </Button>
      </Flex>

      <Flex mb={28} align="flex-end">
        <TextInput
          flex={1}
          mr={14}
          label="플레이어 기본 VID"
          description="ex) https://www.youtube.com/watch?v=r0GUqAuM5Fo라면 r0GUqAuM5Fo만 입력"
          styles={{ description: { wordBreak: 'break-all' } }}
          value={defaultVid}
          onChange={onChangeDefaultVid}
          disabled={mutation.isPending}
        />
        <Button loading={mutation.isPaused} onClick={() => onSave('default_video_id', defaultVid)}>
          저장
        </Button>
      </Flex>
    </Box>
  );
}
