import { clientApi } from '@/apis/fetcher';
import { METADATAS_TAG } from '@/constants/revalidateTag';
import { TMetadata } from '@/types';
import { Button, Skeleton, Table } from '@mantine/core';
import { QueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function Error({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <p>에러가 발생하였습니다.</p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <Skeleton height={32} mt={8} radius="md" />
      <Skeleton height={32} mt={8} radius="md" />
      <Skeleton height={32} mt={8} radius="md" />
    </div>
  );
}

function Success() {
  const { data } = useSuspenseQuery({
    queryKey: [METADATAS_TAG],
    queryFn: () =>
      clientApi
        .get<{ data: TMetadata }>('v1/metadata')
        .json()
        .then((json) => json.data),
    select: (data) =>
      Object.keys(data).map((key, idx, arr) => ({
        key: key,
        value: data[key as keyof typeof data],
      })),
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>KEY</Table.Th>
          <Table.Th>VALUE</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((el) => (
          <Table.Tr key={el.key} styles={{ tr: { wordBreak: 'break-all' } }}>
            <Table.Td>{el.key}</Table.Td>
            <Table.Td>{el.value}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default function CurrentMetadata() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={Error} onError={reset}>
          <Suspense fallback={<Loading />}>
            <Success />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
