import errorHandler from '@/libraries/error/handler';
import axios from 'axios';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    const refreshToken = (await headers()).get('token');

    if (!refreshToken) {
      return NextResponse.json({ session: null }, { status: 200 });
    }

    const response = await axios<{
      access_token: string;
      expires_in: number;
      scope: string;
      token_type: string;
      id_token: string;
    }>({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
    });

    const userInfoRes = await axios.get<{
      sub: string;
      name: string;
      given_name: string;
      picture: string;
      email: string;
      email_verified: boolean;
      locale: string;
    }>(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.data.access_token}`);

    const userInfo = userInfoRes.data;

    console.log('userInfo', userInfo);

    return NextResponse.json(
      {
        session: {
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          locale: userInfo.locale,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = 'force-dynamic';

// const userInfoRes = await axios.get<{
//   sub: string;
//   name: string;
//   given_name: string;
//   picture: string;
//   email: string;
//   email_verified: boolean;
//   locale: string;
// }>(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.data.access_token}`);

// const youtube_info = await axios.get(
//   `https://www.googleapis.com/youtube/v3/channels?access_token=${access_token}&part=snippet,statistics&mine=true&fields=items&2Fsnippet%2Fthumbnails`,
// );

// email: user_info.email,
// channelName: youtube_info.data.items[0].snippet.title,
// subscriberCount: youtube_info.data.items[0].statistics.subscriberCount,
// viewCount: youtube_info.data.items[0].statistics.viewCount,
// channelUrl: `https://www.youtube.com/channel/${youtube_info.data.items[0].id}`,
// profileImgUrl: youtube_info.data.items[0].snippet.thumbnails.default.url,
// channel_id: youtube_info.data.items[0].id,

// const userInfo = jwt.decode(response.data.id_token) as {
//   iss: string;
//   azp: string;
//   aud: string;
//   sub: string;
//   email: string;
//   email_verified: boolean;
//   at_hash: string;
//   name: string;
//   picture: string;
//   given_name: string;
//   family_name: string;
//   locale: string;
//   iat: number;
//   exp: number;
// };
