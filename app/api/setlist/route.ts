import { serverEnvConfig } from '@/configs/envConfig';
import errorHandler from '@/models/error/handler';
import { SearchCommentItemType, SearchCommentResponseType } from '@/types/inHolodex';
import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const PAGINATION_LIMIT = 15;
const SERCH_COMMENT_ENDPOINT = 'https://holodex.net/api/v2/search/commentSearch';

export interface SetListResponseType {
  items: SearchCommentItemType[];
  totalPage: number;
}

export const GET = async (req: NextRequest) => {
  const { HOLODEX_API_KEY } = serverEnvConfig();
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query');
    console.log('요청', page, query);

    if (!query) {
      return NextResponse.json<SetListResponseType>({ totalPage: 0, items: [] }, { status: 200 });
    }

    const offset = (page - 1) * PAGINATION_LIMIT + 1;
    console.log('offect', offset);

    const body = {
      sort: 'newest',
      lang: ['ko'],
      target: ['stream'],
      topic: ['singing'],
      comment: [query],
      paginated: true,
      offset,
      limit: PAGINATION_LIMIT,
    };

    const response: AxiosResponse<SearchCommentResponseType> = await axios.post(SERCH_COMMENT_ENDPOINT, body, {
      headers: { 'X-APIKEY': HOLODEX_API_KEY },
    });
    const totalPage = Math.ceil(response.data.total / PAGINATION_LIMIT);

    return NextResponse.json<SetListResponseType>({ totalPage, items: response.data.items }, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const dynamic = 'force-dynamic';
