import { MONGODB_FEATURED_COLLECTION, MONGODB_MANAGEMENT_DB } from '@/constants';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { connectMongoDB } from '@/libraries/mongodb';
import { TFeaturedData } from '@/libraries/mongodb/type';
import { getYoutubeChannels } from '@/libraries/youtube';
import { youtube_v3 } from 'googleapis';
import { NextResponse } from 'next/server';

// 원본 ID 배열 순서대로 정렬
const sortByOriginalOrder = (
  channels: youtube_v3.Schema$Channel[] | undefined,
  originalIds: string[],
): youtube_v3.Schema$Channel[] => {
  if (!Array.isArray(channels)) return [];
  const idMap = new Map(originalIds.map((id, index) => [id, index]));
  return channels.sort((a, b) => idMap.get(a.id!)! - idMap.get(b.id!)!);
};

const MAX_CHANNEL_SIZE = 30;

export async function GET() {
  try {
    const db = await connectMongoDB(MONGODB_MANAGEMENT_DB, MONGODB_FEATURED_COLLECTION);

    const featuredData = await db.findOne<TFeaturedData>(
      {},
      { projection: { _id: 0 }, sort: { last_updated: -1 } },
    );

    if (!featuredData) {
      throw new CustomServerError({ statusCode: 404, message: '문서를 찾을 수 없습니다.' });
    }

    const copiedTopChannels = featuredData.top_channels.slice(0, MAX_CHANNEL_SIZE);
    const copiedPromisingChannels = featuredData.promising.slice(0, MAX_CHANNEL_SIZE);

    const [topRating, promising] = await Promise.all([
      getYoutubeChannels(copiedTopChannels).then((res) =>
        sortByOriginalOrder(res.items, copiedTopChannels),
      ),
      getYoutubeChannels(copiedPromisingChannels).then((res) =>
        sortByOriginalOrder(res.items, copiedPromisingChannels),
      ),
    ]);

    return NextResponse.json({
      message: '특집 데이터가 조회되었습니다.',
      data: {
        lastUpdateAt: featuredData.last_updated,
        topRating,
        promising,
      },
    });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

// 60초 마다 데이터 업데이트
export const revalidate = 60;
