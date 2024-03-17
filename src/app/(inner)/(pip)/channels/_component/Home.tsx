'use client';
import { ChannelsDataType } from '@/type/api/youtube';
import Pagination from '@inner/_component/Pagination';
import ChannelSection from './ChannelSection';
import { useRouter } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/const';

interface HomeProps {
  totalLength: number;
  contents: ChannelsDataType[];
  currentPage: number;
}

export default function Home({ totalLength, contents, currentPage }: HomeProps) {
  const router = useRouter();
  return (
    <>
      <ChannelSection contents={contents} />
      <Pagination
        count={totalLength}
        pageSize={ITEMS_PER_PAGE}
        sliblingCount={2}
        currentPage={currentPage}
        onPageChange={(page) => router.push(`/channels?page=${page}`)}
      />
    </>
  );
}
